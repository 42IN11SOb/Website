angular
    .module('altairApp')
    .controller('figureDetailsCtrl', [
        '$rootScope',
        '$scope',
        '$stateParams',
        '$state',
        'apiBartimeus',
        function ($rootScope, $scope, $stateParams, $state, apiBartimeus) {
            function getFigure(){
                apiBartimeus.getItem("figures", $stateParams.name, function(figure) {
                    $scope.figure = figure;
                    $scope.$apply();
                });
            }

            $(function() {
                getFigure();
            });

            $scope.saveFigure = function() {
                var figure = $scope.figure;
                delete figure._id;
                delete figure.__v;

                apiBartimeus.updateItem("figures", figure.title, JSON.stringify(figure));
                $state.go('admin.figures');
            }
        }
    ]);