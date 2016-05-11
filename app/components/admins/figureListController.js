angular
    .module('altairApp')
    .controller('figureListCtrl', [
        '$rootScope',
        '$scope',
        'utils',
        'apiBartimeus',
        function ($rootScope,$scope,utils,apiBartimeus) {
            $scope.heading = "Figures";
            $scope.figures = [];

            var $figures_card = $('#figures_card'),
                $figure_list = $('#figure_list'),
                $new_figure = $('#new_figure');

            // show lpage list (hide other forms)
            var figureListShow = function() {
                $figure_list
                    .show()
                    .siblings()
                    .hide();
            };
            // show new page (hide other forms)
            var newFigureShow = function() {
                $new_figure
                    .show()
                    .siblings()
                    .hide();
            };
            $scope.newFigure = function($event) {
                $scope.heading = "New Figure";
                $event.preventDefault();
                utils.card_show_hide($figures_card,undefined,newFigureShow,undefined);
            };
            $scope.backToFigures = function($event) {
                $scope.heading = "Figures";
                $event.preventDefault();
                utils.card_show_hide($figures_card,undefined,figureListShow,undefined);
            };

            function getFigures() {
                $scope.figures.length = 0;
                apiBartimeus.getItems("figures", function(figures) {
                    for(var i in figures){
                        $scope.figures.push(figures[i]);
                    }
                    $scope.$apply();
                    //update table 
                    ts_users.trigger('update');
                });
            }

            $(function() {
                getFigures();
            });

            function deleteFigure (name) {
                apiBartimeus.deleteItem("figures", name);
            };

            $scope.createFigure = function(name, event) {
                apiBartimeus.createItem("figures", name);
                $scope.backToFigures(event);
                getFigures();
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
                            widgets: ['zebra', 'filter'],
                            headers: {
                                0: {
                                    sorter: false,
                                    parser: false
                                }
                            }
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
                        UIkit.modal.confirm('Are you sure you want to delete this figure?', function(){
                            deleteFigure($this.closest('tr')[0].cells[1].innerText);
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