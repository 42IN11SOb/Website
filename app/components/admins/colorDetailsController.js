angular
    .module('altairApp')
    .controller('colorDetailsCtrl', [
        '$rootScope',
        '$scope',
        'color_data',
        '$state',
        'apiBartimeus',
        function ($rootScope, $scope, color_data, $state, apiBartimeus) {
            $scope.color;
            var oldName;
            var picker =  $('#colorInput');

            function getColor(callback) {
                    $scope.color = color_data;
                    oldName = color_data.name;
                    //$scope.$apply();
                    callback(color_data);
            }

            $(function() {
                //init color picker, change color on click color
                $('#ColorInput').wheelColorPicker();
                getColor(function(color){
                    var value = apiBartimeus.rgbToHex(color.r,color.g,color.b);
                    $('#ColorInput').wheelColorPicker('setValue', value);
                });
            });

            $scope.save = function() {
                var rgb = apiBartimeus.hexToRgb($('#ColorInput').wheelColorPicker('getValue'));
                $scope.color.r = rgb.r;
                $scope.color.g = rgb.g;
                $scope.color.b = rgb.b;

                apiBartimeus.updateItem("colors", oldName, $scope.color);

                $state.go('admin.colors');
            }

            $scope.deleteColor = function(name){
                apiBartimeus.deleteItem("colors", name);
                getColors();
            };
        }
    ]);