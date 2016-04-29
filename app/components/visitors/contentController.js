angular
    .module('altairApp')
    .controller('contentCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$sce',
        'apiBartimeus',
        'pageContent',
        function ($rootScope,$scope,$timeout,$sce,apiBartimeus,pageContent) {
        	$scope.items = pageContent;

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