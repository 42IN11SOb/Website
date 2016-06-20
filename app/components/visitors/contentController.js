angular
    .module('altairApp')
    .controller('contentCtrl', [
        '$rootScope',
        '$scope',
        '$sce',
        'apiBartimeus',
        'page_data',
        function ($rootScope,$scope,$sce,apiBartimeus,page_data) {

            $scope.toTrustedHTML = function(html) {
                return $sce.trustAsHtml(html);
            };

            $(function() {
                $scope.page = page_data;
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