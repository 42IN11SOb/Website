angular
    .module('altairApp')
    .controller('contentCtrl', [
        '$rootScope',
        '$scope',
        '$sce',
        'apiBartimeus',
        '$stateParams',
        function ($rootScope,$scope,$sce,apiBartimeus,$stateParams) {
            if ($stateParams.name === "news") {
                var news = "";
                apiBartimeus.getItems("news", function(items) {
                    for (var item in items) {
                        var message = items[item];
                        if (message.publish) {
                            news += '<div class="md-card">';
                            news += '<div class="md-card-toolbar">';
                            news += '<h1 class="md-card-toolbar-heading-text large-heading">' + message.title + '</h1>';
                            news += '</div>';
                            news += '<div class="md-card-content">';
                            news += message.content;
                            news += '</div></div>';
                        }
                    }
                    $scope.page = {content: news};
                    $scope.$apply();
                });
            } else {
                apiBartimeus.getItem("pages", $stateParams.name, function(item) {
                    $scope.page = item;
                    $scope.$apply();
                });
            }

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