angular
    .module('altairApp')
    .controller('signupPepCtrl', [
        '$rootScope',
        '$scope',
        'pep_data',
        'apiBartimeus',
        '$state',
        function($rootScope, $scope, pep_data, apiBartimeus, $state) {
            $scope.peps = [];

            $(function() {
                for(var pep in pep_data) {
                    if(new Date(pep_data[pep].datum) > Date.now()) {
                        $scope.peps.push(pep_data[pep]);
                    }
                }
            });

            $scope.createSignup = function() {
                var splitted = $scope.signup.birthdate.split("-");
                var newPepdag = {
                    naam: $scope.signup.name,
                    telefoonnummer: $scope.signup.phone,
                    email: $scope.signup.email,
                    geboortedatum: splitted[2] + "-" + splitted[1] + "-"+ splitted[0],
                    voorkeursdatum: $scope.signup.pepid
                };

                apiBartimeus.createItemObject('pepdag', newPepdag, function(response) {
                    $state.go(bartimeus.content({name: 'home'}));
                });
            }
        }
    ]);