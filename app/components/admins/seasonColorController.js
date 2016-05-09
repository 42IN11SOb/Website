angular
    .module('altairApp')
    .controller('seasonColorCtrl', [
        '$rootScope',
        '$scope',
        'apiBartimeus',
        '$stateParams',
        function ($rootScope,$scope,apiBartimeus,$stateParams) {
            $(function() {
                apiBartimeus.getSeasonColors($stateParams.name, function(season) {
                    $scope.colors = season.colors;
                    $scope.$apply();
                });
            });

            $scope.deleteSeasonColor = function(name){

            };
        }
    ]);