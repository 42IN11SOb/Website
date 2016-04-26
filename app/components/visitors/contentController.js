angular
    .module('altairApp')
    .controller('contentCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$sce',
        'apiBartimeus',
        '$stateParams',
        function ($rootScope,$scope,$timeout,$sce,apiBartimeus,$stateParams) {
        	$scope.items = apiBartimeus.getContent($stateParams.name);

            $scope.toTrustedHTML = function(html) {
                return $sce.trustAsHtml(html);
            };

            $(function() {
                if (!$rootScope.initialized) {
                    if (apiBartimeus.loggedIn(true) === false) {
                        apiBartimeus.logout();
                    }
                    $rootScope.initialized = true;
                }
            });
        }
    ]);