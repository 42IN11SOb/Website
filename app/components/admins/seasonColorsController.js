angular
    .module('altairApp')
    .controller('seasonColorsCtrl', [
        '$rootScope',
        '$scope',
        'apiBartimeus',
        '$stateParams',
        '$state',
        function ($rootScope, $scope, apiBartimeus, $stateParams, $state) {
            $scope.allColors = [];

            $(function() {
                apiBartimeus.getSeason($stateParams.name, function(season) {
                    var seasonColors = [];
                    var colors = season.colors;

                    for (var i in colors) {
                        if(colors[i].color != null) seasonColors.push(colors[i].color.name);
                    }

                    apiBartimeus.getColors(function(colors) {
                        for (var i in colors) {
                            colors[i].hex = apiBartimeus.rgbToHex(colors[i].r, colors[i].g, colors[i].b);
                            if (seasonColors.indexOf(colors[i].name) > -1) colors[i].active = true;
                            $scope.allColors.push(colors[i]);
                        }
                        $scope.$apply();
                    });
                });
            });

            $scope.save = function() {
                var retColors = {name:$stateParams.name, colors:[]};

                for(var i in $scope.allColors) {
                    if($scope.allColors[i].active === true){
                        retColors.colors.push({color: $scope.allColors[i]._id});
                    }
                }

                apiBartimeus.updateSeason(retColors.name, JSON.stringify(retColors));
                $state.go('admin.seasons');
            }
        }
    ]);