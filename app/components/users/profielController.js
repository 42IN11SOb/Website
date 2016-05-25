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
            }

            $(function() {
                apiBartimeus.getProfile(function(profile) {
                    $scope.user = profile;

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
                });
            });
        }
    ]);