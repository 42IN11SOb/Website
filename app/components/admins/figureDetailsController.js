angular
    .module('altairApp')
    .controller('figureDetailsCtrl', [
        '$rootScope',
        '$scope',
        '$stateParams',
        '$state',
        'apiBartimeus',
        function ($rootScope, $scope, $stateParams, $state, apiBartimeus) {
            var oldName;

            function getFigure(){
                apiBartimeus.getItem("figures", $stateParams.name, function(figure) {
                    oldName = figure.title;
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

                apiBartimeus.updateItem("figures", oldName, JSON.stringify(figure));
                $state.go('admin.figures');
            }
        }
    ]);