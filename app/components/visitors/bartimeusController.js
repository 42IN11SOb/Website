angular
    .module('altairApp')
    .controller('bartimeusCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        function($rootScope, $scope, $timeout) {
                $rootScope.toBarActive = true;
                $rootScope.topMenuActive = true;
                
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                //set these true for each state to keep top menu/full header
                $rootScope.toBarActive = true;
                $rootScope.topMenuActive = true;
            });
        }
    ]);