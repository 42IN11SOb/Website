angular
    .module('altairApp')
    .controller('profielCtrl', [
        '$rootScope',
        '$scope',
        'profile_data',
        'apiBartimeus',
        function($rootScope, $scope, profile_data, apiBartimeus) {
            $scope.user;
            var colors = [];

            $(function() {
                $scope.user = profile_data;

                //push colors to array and convert to hex, for palette
                for (var i in $scope.user.passport.season.colors) {
                    var color = $scope.user.passport.season.colors[i].color;
                    colors.push(apiBartimeus.rgbToHex(color.r, color.g, color.b));
                }

                //init palette after colors are ready
                $("#palette").kendoColorPalette({
                    tileSize: 90,
                    palette: colors
                });
            });
        }
    ]);