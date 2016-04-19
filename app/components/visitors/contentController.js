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
        	$scope.toTrustedHTML = function(html) {
        	    return $sce.trustAsHtml(html);
        	};

        	$scope.items = apiBartimeus.getContent($stateParams.name);
        }
    ]);