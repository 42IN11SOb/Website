angular
    .module('altairApp')
    .controller('figureDetailsCtrl', [
        '$rootScope',
        '$scope',
        'figure_data',
        '$state',
        'apiBartimeus',
        function ($rootScope, $scope, figure_data, $state, apiBartimeus) {
            var oldName;

            function getFigure(){
                    oldName = figure_data.title;
                    $scope.figure = figure_data;
                    //$scope.$apply();
            }

            $(function() {
                getFigure();
            });

            $scope.saveFigure = function() {
                var figure = $scope.figure;
                delete figure._id;
                delete figure.__v;

                apiBartimeus.updateItem("figures", oldName, JSON.stringify(figure));
                $state.go('admin.figures');
            }
        }
    ]);