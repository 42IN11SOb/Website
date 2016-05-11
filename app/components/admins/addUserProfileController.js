angular
    .module('altairApp')
    .controller('userProfileCtrl', [
        '$scope',
        '$rootScope',
        'utils',
        function ($scope,$rootScope,utils) {

            var $userProfileForm = $('#userProfileForm');
  
            $scope.finishedWizard = function() {
                var form_serialized = JSON.stringify( utils.serializeObject($userProfileForm), null, 2 );
                UIkit.modal.alert('<p>Form data:</p><pre>' + form_serialized + '</pre>');
                
                //get form data

                //validate form data
                $userProfileForm
                    .parsley()
                    .on('form:validated',function() {
                        $scope.$apply();
                    })
                    .on('field:validated',function(parsleyField) {
                        if($(parsleyField.$element).hasClass('md-input')) {
                            $scope.$apply();
                        }
                    });
                
                //check if all fields have been filled

                //check if password fields match
                

                //save to database



            };

            $scope.validateUserPortion = function(context) {
                var passed = true;

                //context is empty 
                console.log(context);

                if(context.password !== context.paswordRepeat)
                {
                    console.log("password mismatch");

                    passed = false;
                }
                else if(typeof context.userName === 'undefined')
                {
                    console.log("user name undefined");
                    passed = false;
                }
                else if(typeof context.password === 'undefined')
                {
                    console.log("password undefined");
                    passed = false;
                }
                else if(typeof context.email === 'undefined')
                {
                    console.log("email undefined");
                    passed = false;
                }
                

                return passed;
            };

            $scope.validateProfilePortion = function() {

            };


        }
    ]);