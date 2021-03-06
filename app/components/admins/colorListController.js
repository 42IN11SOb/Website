angular
    .module('altairApp')
    .controller('colorListCtrl', [
        '$rootScope',
        '$scope',
        'utils',
        'apiBartimeus',
        'colors_data',
        function ($rootScope,$scope,utils,apiBartimeus,colors_data) {
            $scope.heading = "Kleuren";
            $scope.colors = [];

            var $colors_card = $('#colors_card'),
                $color_list = $('#color_list'),
                $new_color = $('#new_color');

            // show lpage list (hide other forms)
            var colorListShow = function() {
                $color_list
                    .show()
                    .siblings()
                    .hide();
            };
            // show new page (hide other forms)
            var newColorShow = function() {
                $new_color
                    .show()
                    .siblings()
                    .hide();
            };
            $scope.newColor = function($event) {
                $scope.heading = "Nieuwe kleur";
                $event.preventDefault();
                utils.card_show_hide($colors_card,undefined,newColorShow,undefined);
            };
            $scope.backToColors = function($event) {
                $scope.heading = "Kleuren";
                $event.preventDefault();
                utils.card_show_hide($colors_card,undefined,colorListShow,undefined);
            };

            function getColors() {
                for(var color in colors_data){
                    $scope.colors.push(colors_data[color]);
                }
            }

            $(function() {
                getColors();
            });

            function deleteColor (name) {
                apiBartimeus.deleteItem("colors", name);
            };

            $scope.createColor = function(name, event) {
                apiBartimeus.createItemObject("colors", {name: name, r:0, g:0, b:0}, function(newColor) {
                    $scope.colors.push(newColor);
                    //ts_users.trigger('update');
                    $scope.backToColors(event);
                });
            };

            //table setup 
            var $ts_pager_filter = $("#ts_pager_filter");
            var ts_users = $ts_pager_filter
            // initialize tables TABLESORTER PLUGIN STUFF
            $scope.$on('onLastRepeat', function (scope, element, attrs) {

                // pager + filter
                if($(element).closest($ts_pager_filter).length) {

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
                        removeRows: false,
                        // go to page selector - select dropdown that sets the current page
                        cssGoto: '.ts_gotoPage'
                    };

                    // Initialize tablesorter
                        ts_users = $ts_pager_filter
                        .tablesorter({
                            theme: 'altair',
                            widthFixed: true,
                            widgets: ['zebra', 'filter']
                        })
                        // initialize the pager plugin
                        .tablesorterPager(pagerOptions)
                        .on('pagerComplete', function(e, filter){
                            // update selectize value
                            if(typeof selectizeObj !== 'undefined' && selectizeObj.data('selectize')) {
                                selectizePage = selectizeObj[0].selectize;
                                selectizePage.setValue($('select.ts_gotoPage option:selected').index() + 1, false);
                            }

                        });

                    // remove single row
                    $ts_pager_filter.on('click','.ts_remove_row',function(e) {
                        e.preventDefault();

                        var $this = $(this);
                          UIkit.modal.confirm('Weet u zeker dat u dit wilt verwijderen?', function(){
                            var lastPart = $($this.closest('tr')[0].cells[1]).children().first().attr("href").split("/").pop();
                            console.log(lastPart);
                            deletePep(lastPart);
                            $this.closest('tr').remove();
                            ts_users.trigger('update');
                        }, {
                            labels: {
                                'Ok': 'Delete'
                            }
                        });
                    });
                }
            });


        }
    ]);