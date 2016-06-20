angular
    .module('altairApp')
    .controller('bartimeusCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        'apiBartimeus',
        function($rootScope, $scope, $timeout,apiBartimeus) {/*
                $rootScope.toBarActive = true;
                $rootScope.topMenuActive = true;

                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                    $rootScope.toBarActive = true;
                    $rootScope.topMenuActive = true;
            });*/
        }
    ]);
