angular
    .module('altairApp')
    .controller('seasonListCtrl', [
        '$rootScope',
        '$scope',
        'utils',
        'variables',
        'apiBartimeus',
        function ($rootScope,$scope,utils,variables,apiBartimeus) {
            $scope.heading = "Seasons";
            $scope.seasons = [];

            var $pages_card = $('#pages_card'),
                $page_list = $('#page_list'),
                $new_page = $('#new_page');

            // show lpage list (hide other forms)
            var pageListShow = function() {
                $page_list
                    .show()
                    .siblings()
                    .hide();
            };
            // show new page (hide other forms)
            var newPageShow = function() {
                $new_page
                    .show()
                    .siblings()
                    .hide();
            };
            $scope.newPage = function($event) {
                $scope.heading = "New Season";
                $event.preventDefault();
                utils.card_show_hide($pages_card,undefined,newPageShow,undefined);
            };
            $scope.backToLogin = function($event) {
                $scope.heading = "Seasons";
                $event.preventDefault();
                utils.card_show_hide($pages_card,undefined,pageListShow,undefined);
            };

            function getSeasons() {
                $scope.seasons.length = 0;
                apiBartimeus.getSeasons(function(seasons) {
                    for(var i in seasons){
                        $scope.seasons.push(seasons[i]);
                    }
                    $scope.$apply();
                    //update table 
                    $ts_issues.trigger('update');
                });
            }

            $(function() {
                getSeasons();
            });

            $scope.deleteSeason = function(name) {
                apiBartimeus.deleteItem("seasons", name);
                getSeasons();
            };

            $scope.createSeason = function(name, event) {
                apiBartimeus.createItem("seasons", name);
                $scope.backToLogin(event);
                getSeasons();
            };

            //table setup 
            var $ts_issues = $("#ts_issues");
            $scope.$on('onLastRepeat', function(scope, element, attrs) {

                // issues list tablesorter
                if ($(element).closest($ts_issues).length) {

                    // define pager options
                    var pagerOptions = {
                        // target the pager markup - see the HTML block below
                        container: $(".ts_pager"),
                        // output string - default is '{page}/{totalPages}'; possible variables: {page}, {totalPages}, {startRow}, {endRow} and {totalRows}
                        output: '{startRow} - {endRow} / {totalRows}',
                        // if true, the table will remain the same height no matter how many records are displayed. The space is made up by an empty
                        // table row set to a height to compensate; default is false
                        fixedHeight: true,
                        // remove rows from the table to speed up the sort of large tables.
                        // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
                        removeRows: false
                    };

                    // Initialize tablesorter
                    $ts_issues
                        .tablesorter({
                            theme: 'altair',
                            widthFixed: true,
                            widgets: ['zebra', 'filter']
                        })
                        // initialize the pager plugin
                        .tablesorterPager(pagerOptions)
                        .on('pagerComplete', function(e, filter) {
                            // update selectize value
                            if (typeof selectizeObj !== 'undefined' && selectizeObj.data('selectize')) {
                                selectizePage = selectizeObj[0].selectize;
                                selectizePage.setValue($('select.ts_gotoPage option:selected').index() + 1, false);
                            }

                        });
                }

            })
        }
    ]);