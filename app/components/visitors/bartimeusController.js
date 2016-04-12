angular
    .module('altairApp')
    .controller('bartimeusCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        function ($rootScope,$scope,$timeout) {

            $rootScope.toBarActive = true;

            $rootScope.topMenuActive = true;

        }
    ]);