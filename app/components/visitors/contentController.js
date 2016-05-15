angular
    .module('altairApp')
    .controller('contentCtrl', [
        '$rootScope',
        '$scope',
        '$sce',
        'apiBartimeus',
        '$stateParams',
        function ($rootScope,$scope,$sce,apiBartimeus,$stateParams) {
        	apiBartimeus.getItem("pages", $stateParams.name, function(item) {
                $scope.page = item;
                $scope.$apply();
            })

            $scope.toTrustedHTML = function(html) {
                return $sce.trustAsHtml(html);
            };

            $(function() {
                if (!$rootScope.initialized) {
                    //checks token on api, if this is too demanding with more users just get rid of the true parameter
                    if (apiBartimeus.loggedIn(true) === false) {
                        apiBartimeus.logout();
                    }
                    $rootScope.initialized = true;
                }
            });
        }
    ]);