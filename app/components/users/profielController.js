angular
    .module('altairApp')
    .controller('profielCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$state',
        function($rootScope, $scope, $timeout, $state) {
            $scope.user;
            var colors = [];

            function getProfile() {
                $.ajax({
                    url: "http://localhost:3000/users/profile",
                    type: "GET",
                    success: function(data) {
                        console.log(data);
                        if (data.success != true) {
                            //user not logged in or token expired
                            $state.go('login');
                        } else {
                            $scope.user = data.user;

                            //push colors to array and convert to hex, for palette
                            for (var i in data.user.passport.season.colors) {
                                var color = data.user.passport.season.colors[i].color;
                                colors.push(rgbToHex(color.r, color.g, color.b));
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
                        }
                    },
                    error: function(data) {
                        console.log(data.message);
                        //show error message
                    }
                });
            }

            function componentToHex(c) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            }

            function rgbToHex(r, g, b) {
                return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
            }


            $(function(){
                getProfile();
            })
        }
    ]);