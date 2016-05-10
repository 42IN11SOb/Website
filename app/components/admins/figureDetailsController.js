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
                apiBartimeus.getFigure($stateParams.name, function(figure) {
                    $scope.figure = figure;
                    $scope.$apply();
                    console.log(figure);
                });
            }

            $(function() {
                getFigure();
            });

            $scope.saveFigure = function() {
                var figure = $scope.figure;
                delete figure._id;
                delete figure.__v;

                console.log(figure);

                apiBartimeus.updateFigure(figure.title, JSON.stringify(figure));
                $state.go('admin.figures');
            }
        }
    ]);