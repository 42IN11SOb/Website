angular
    .module('altairApp')
    .controller('profielCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$state',
        function($rootScope, $scope, $timeout, $state) {
            $scope.user;

            function getProfile() {
                $.ajax({
                    url: "http://localhost:3000/seasons",
                    type: "GET",
                    success: function(data) {
                        console.log(data);
                        if (data.success != true) {
                            //user not logged in or token expired
                            $state.go('login');
                        } else {
                            $scope.user = data;
                        }
                    },
                    error: function(data) {
                        console.log(data.message);
                        //show error message
                    }
                });
            }

            $(function(){
                getProfile();
            })
        }
    ]);