/*
 *  Altair Admin angularjs
 *  controller
 */

angular
    .module('altairApp')
    .controller('mainCtrl', [
        '$scope',
        '$rootScope',
        function ($scope,$rootScope) {}
    ])
    .controller('main_headerCtrl', [
        '$timeout',
        '$scope',
        '$window',
        'apiBartimeus',
        '$state',
        function ($timeout,$scope,$window,apiBartimeus,$state) { 
            $scope.loggedin = apiBartimeus.loggedIn();

            $scope.logoff = function() {
                apiBartimeus.logout();
                $scope.loggedin = false;
            }

            $('#menu_top').children('[data-uk-dropdown]').on('show.uk.dropdown', function(){
                $timeout(function() {
                    $($window).resize();
                },280)
            });


        }
    ])
    .controller('main_sidebarCtrl', [
        '$timeout',
        '$scope',
        '$rootScope',
        'apiBartimeus',
        function ($timeout,$scope,$rootScope,apiBartimeus) {

            $scope.$on('onLastRepeat', function (scope, element, attrs) {
                $timeout(function() {
                    if(!$rootScope.miniSidebarActive) {
                        // activate current section
                        $('#sidebar_main').find('.current_section > a').trigger('click');
                    } else {
                        // add tooltips to mini sidebar
                        var tooltip_elem = $('#sidebar_main').find('.menu_tooltip');
                        tooltip_elem.each(function() {
                            var $this = $(this);

                            $this.attr('title',$this.find('.menu_title').text());
                            UIkit.tooltip($this, {});
                        });
                    }
                })
            });
            $scope.sections = apiBartimeus.getAdminSections();

        }
    ])
    .controller('menu_topViewCtrl', [
        '$scope',
        '$rootScope',
        'apiBartimeus',
        '$state',
        function ($scope,$rootScope,apiBartimeus,$state) {
            $(function(){
                $scope.sections = [{
                    title: "Nieuws",
                    class: "",
                    name: "news"
                }];
                apiBartimeus.getItems("pages", function(items) {
                    for(var page in items){
                        $scope.sections.push({
                            title: items[page].title,
                            class: items[page].class,
                            name: items[page].name
                        })
                    }
                    $scope.$apply();
                })
            });
        }
    ])
;
