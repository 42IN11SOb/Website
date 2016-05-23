angular
    .module('altairApp')
    .controller('newsListCtrl', [
        '$rootScope',
        '$scope',
        '$stateParams',
        'utils',
        'apiBartimeus',
        function ($rootScope,$scope,$stateParams,utils,apiBartimeus) {
            $scope.heading = "News";
            $scope.newses = [];

            function getNewses() {
                apiBartimeus.getItems("news", function(newses) {
                    for(var news in newses){
                        $scope.newses.push(newses[news]);
                    }
                })
            }

            var $newses_card = $('#newses_card'),
                $news_list = $('#news_list'),
                $new_news = $('#new_news');

            // show lpage list (hide other forms)
            var newsListShow = function() {
                $news_list
                    .show()
                    .siblings()
                    .hide();
            };
            // show new page (hide other forms)
            var newNewsShow = function() {
                $new_news
                    .show()
                    .siblings()
                    .hide();
            };
            $scope.newNews = function($event) {
                $scope.heading = "New News";
                $event.preventDefault();
                utils.card_show_hide($newses_card,undefined,newNewsShow,undefined);
            };
            $scope.backToNewses = function($event) {
                $scope.heading = "News";
                $event.preventDefault();
                utils.card_show_hide($newses_card,undefined,newsListShow,undefined);
            };

            //$scope.pages = pages;

            $(function() {
                getNewses();
            });

            $scope.createNews = function(event) {
                var news = {
                    title: $scope.newTitle,
                    content: "<p></p>"
                }
                apiBartimeus.createItemObject("news", news);
                $scope.newses.push(news);
                $scope.backToNewses(event);
            };
            function deleteNews(name){
                apiBartimeus.deleteItem("news", name);
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
                                    parser: true
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
                        UIkit.modal.confirm('Are you sure you want to delete this season?', function(){
                            deleteNews($this.closest('tr')[0].cells[0].innerText);
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