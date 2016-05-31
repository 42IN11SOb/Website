angular
    .module('altairApp')
    .controller('seasonColorsCtrl', [
        '$rootScope',
        '$scope',
        'apiBartimeus',
        'colors_data',
        'season_data',
        '$state',
        function ($rootScope, $scope, apiBartimeus, colors_data, season_data, $state) {
            $scope.allColors = [];
            $scope.season;
            var oldName;

            $(function() {
                oldName = season_data.name;
                $scope.season = season_data;
                var seasonColors = [];
                var colors = season_data.colors;

                for (var i in colors) {
                    if (colors[i].color != null) seasonColors.push(colors[i].color.name);
                }

                for (var i in colors_data) {
                    colors_data[i].hex = apiBartimeus.rgbToHex(colors_data[i].r, colors_data[i].g, colors_data[i].b);
                    if (seasonColors.indexOf(colors_data[i].name) > -1) colors_data[i].active = true;
                    $scope.allColors.push(colors_data[i]);
                }
                //$scope.$apply();
            });

            $scope.save = function() {
                var retColors = {name:$scope.season.name, colors:[]};

                for(var i in $scope.allColors) {
                    if($scope.allColors[i].active === true){
                        retColors.colors.push({color: $scope.allColors[i]._id});
                    }
                }

                apiBartimeus.updateItem("seasons", oldName, JSON.stringify(retColors));
                $state.go('admin.seasons');
            }
        }
    ]);