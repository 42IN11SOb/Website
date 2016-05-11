angular
    .module('altairApp')
    .controller('colorsCtrl', [
        '$rootScope',
        '$scope',
        'apiBartimeus',
        function ($rootScope, $scope, apiBartimeus) {
            $scope.colors = [];

            function getColors() {
                $scope.colors.length = 0;
                apiBartimeus.getColors(function(colors) {
                    for(var i in colors){
                        colors[i].hex = apiBartimeus.rgbToHex(colors[i].r,colors[i].g,colors[i].b);
                        $scope.colors.push(colors[i]);
                    }
                });
            }

            $(function() {
                getColors();
            });

            $scope.newColor = function() {
                $scope.colors.push({new:true});
            }

            $scope.save = function() {
                var retColors = [];

                for (var i in $scope.colors) {
                    var color = $scope.colors[i];

                    if(color.new){
                        var col = {name: color.newname};

                        var rgb = apiBartimeus.hexToRgb(color.hex);
                        
                        col.r = rgb.r;
                        col.g = rgb.g;
                        col.b = rgb.b;

                        apiBartimeus.postColor(col);
                        retColors.push(col);
                    } else if (color.changed){
                        var col = {name: color.newname};

                        var rgb = apiBartimeus.hexToRgb(color.hex);
                        
                        col.r = rgb.r;
                        col.g = rgb.g;
                        col.b = rgb.b;

                        apiBartimeus.updateColor(color.name, col);
                        retColors.push(col);
                    }
                }
                console.log(retColors);
            }

            $scope.deleteColor = function(name){
                apiBartimeus.deleteItem("colors", name);
                getColors();
            };
        }
    ]);