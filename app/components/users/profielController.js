angular
    .module('altairApp')
    .controller('profielCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        'apiBartimeus',
        function($rootScope, $scope, $state, apiBartimeus) {
            $scope.user;
            var colors = [];

            function getProfile() {
                $.ajax({
                    url: "http://projectpep.herokuapp.com/users/profile",
                    type: "GET",
                    success: function(data) {
                        console.log(data);
                        //if (data.success != true) {
                            console.log(data)
                            //user not logged in or token expired
                            //$state.go('login');
                        //} else {
                            $scope.user = data.data;

                            //push colors to array and convert to hex, for palette
                            for (var i in $scope.user.passport.season.colors) {
                                var color = $scope.user.passport.season.colors[i].color;
                                colors.push(apiBartimeus.rgbToHex(color.r, color.g, color.b));
                            }

                            $scope.$apply();

                            //init palette after colors are ready
                            $("#palette").kendoColorPalette({
                                tileSize: {
                                    width: 90,
                                    height: 90
                                },
                                palette: colors
                            });
                       // }
                    },
                    error: function(data) {
                        console.log(data);
                        //show error message
                    }
                });
            }

            $(function(){
                getProfile();
            })
        }
    ]);