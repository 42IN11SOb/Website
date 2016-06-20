angular
    .module('altairApp')
    .controller('pepDetailsCtrl', [
        '$rootScope',
        '$scope',
        'pep_data',
        'user_data',
        '$state',
        'apiBartimeus',
        function ($rootScope, $scope, pep_data, user_data, $state, apiBartimeus) {
            function getPep(){
                    $scope.pep = pep_data;
                    $scope.pep.datum = new Date($scope.pep.datum).toLocaleDateString();
                    //$scope.$apply();
            }

            $(function() {
                getPep();
            });

            $scope.savePep = function() {
                var pep = $scope.pep;
                var splitted = pep.datum.split('-');
                pep.datum = new Date(splitted[2],splitted[1] - 1,splitted[0]);
                delete pep.__v;

                apiBartimeus.updateItem("pepdagdates", pep._id, pep);
                $state.go('admin.pep');
            }
        }
    ]);