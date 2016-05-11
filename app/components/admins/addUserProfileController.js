angular
    .module('altairApp')
    .controller('userProfileCtrl', [
        '$scope',
        '$rootScope',
        'utils',
        'apiBartimeus',
        function ($scope,$rootScope,utils,apiBartimeus) {
            $scope.user = {};
            $scope.seasons = [];
            $scope.figures = [];
            function getSeasons() {
                apiBartimeus.getSeasons(function(seasons) {
                    for(var i in seasons){
                        $scope.seasons.push({
                            name: seasons[i].name,
                            id: seasons[i]._id
                        });
                    }
                });
            }
            function getFigures() {
                apiBartimeus.getFigures(function(figures) {
                    for(var i in figures){
                        $scope.figures.push({
                            name: figures[i].title,
                            id: figures[i]._id
                        });
                    }
                });
            }

            $(function(){
                getSeasons();
                getFigures();
            })

            var $userProfileForm = $('#userProfileForm');
  
            $scope.finishedWizard = function() {
                apiBartimeus.createPassport(JSON.stringify($scope.user.passport), function(retData) {
                    console.log(retData);
                    $scope.user.passport = retData.data._id;
                    apiBartimeus.createUser($scope.user);
                });               
                /*var form_serialized = JSON.stringify( utils.serializeObject($userProfileForm), null, 2 );
                UIkit.modal.alert('<p>Form data:</p><pre>' + form_serialized + '</pre>');*/
                
                //get form data

                //validate form data
                /*$userProfileForm
                    .parsley()
                    .on('form:validated',function() {
                        $scope.$apply();
                    })
                    .on('field:validated',function(parsleyField) {
                        if($(parsleyField.$element).hasClass('md-input')) {
                            $scope.$apply();
                        }
                    });*/
                
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