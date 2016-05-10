angular
    .module('altairApp')
    .controller('userProfileCtrl', [
        '$scope',
        '$rootScope',
        'utils',
        function ($scope,$rootScope,utils) {

            var $userProfileForm = $('#userProfileForm');
            // $scope.input = {};
            console.log("start");
            $scope.finishedWizard = function() {
                var form_serialized = JSON.stringify( utils.serializeObject($userProfileForm), null, 2 );
                UIkit.modal.alert('<p>Form data:</p><pre>' + form_serialized + '</pre>');
                console.log("finished");
            };

        }
    ]);