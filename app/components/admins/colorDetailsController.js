angular
    .module('altairApp')
    .controller('colorDetailsCtrl', [
        '$rootScope',
        '$scope',
        '$stateParams',
        '$state',
        'apiBartimeus',
        function ($rootScope, $scope, $stateParams, $state, apiBartimeus) {
            $scope.color;
            var oldName;
            var picker =  $('#colorInput');

            function getColor(callback) {
                apiBartimeus.getItem("colors", $stateParams.name, function(color) {
                    $scope.color = color;
                    oldName = color.name;
                    $scope.$apply();
                    callback(color);
                });
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