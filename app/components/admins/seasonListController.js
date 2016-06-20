angular
    .module('altairApp')
    .controller('seasonListCtrl', [
        '$rootScope',
        '$scope',
        'utils',
        'apiBartimeus',
        'seasons_data',
        function ($rootScope,$scope,utils,apiBartimeus,seasons_data) {
            $scope.heading = "Seizoenen";
            $scope.seasons = [];

            var $seasons_card = $('#seasons_card'),
                $season_list = $('#season_list'),
                $new_season = $('#new_season');

            // show lpage list (hide other forms)
            var seasonListShow = function() {
                $season_list
                    .show()
                    .siblings()
                    .hide();
            };
            // show new page (hide other forms)
            var newSeasonShow = function() {
                $new_season
                    .show()
                    .siblings()
                    .hide();
            };
            $scope.newSeason = function($event) {
                $scope.heading = "Nieuw Seizoen";
                $event.preventDefault();
                utils.card_show_hide($seasons_card,undefined,newSeasonShow,undefined);
            };
            $scope.backToSeasons = function($event) {
                $scope.heading = "Seizoen";
                $event.preventDefault();
                utils.card_show_hide($seasons_card,undefined,seasonListShow,undefined);
            };

            function getSeasons() {
                for(var season in seasons_data) {
                    $scope.seasons.push(seasons_data[season]);
                }
            }

            $(function() {
                getSeasons();
            });

            function deleteSeason(name) {
                apiBartimeus.deleteItem("seasons", name);
            };

            $scope.createSeason = function(name, event) {
                apiBartimeus.createItem("seasons", name, function(newSeason) {
                    $scope.seasons.push(newSeason);
                    //ts_users.trigger('update');
                    $scope.backToSeasons(event);
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
                        UIkit.modal.confirm('Are you sure you want to delete this season?', function(){
                            deleteSeason($this.closest('tr')[0].cells[0].innerText);
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