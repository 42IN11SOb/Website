angular
    .module('altairApp')
    .controller('loginCtrl', [
        '$scope',
        '$rootScope',
        'utils',
        '$state',
        'apiBartimeus',
        function ($scope,$rootScope,utils,$state,apiBartimeus) {

            $scope.registerFormActive = false;

            $scope.loginError = {};

            var $login_card = $('#login_card'),
                $login_form = $('#login_form'),
                $login_help = $('#login_help'),
                $register_form = $('#register_form'),
                $login_password_reset = $('#login_password_reset'),
                $formValidate = $('#form_validation');

            // show login form (hide other forms)
            var login_form_show = function() {
                $login_form
                    .show()
                    .siblings()
                    .hide();
            };

            // show register form (hide other forms)
            var register_form_show = function() {
                $register_form
                    .show()
                    .siblings()
                    .hide();
            };

            // show login help (hide other forms)
            var login_help_show = function() {
                $login_help
                    .show()
                    .siblings()
                    .hide();
            };

            // show password reset form (hide other forms)
            var password_reset_show = function() {
                $login_password_reset
                    .show()
                    .siblings()
                    .hide();
            };

            $formValidate
                .parsley()
                .on('form:validated', function() {
                    $scope.$apply();
                })
                .on('field:validated', function(parsleyField) {
                    if ($(parsleyField.$element).hasClass('md-input')) {
                        $scope.$apply();
                    }
                });

            $scope.loginHelp = function($event) {
                $event.preventDefault();
                utils.card_show_hide($login_card,undefined,login_help_show,undefined);
            };

            $scope.backToLogin = function($event) {
                $event.preventDefault();
                $scope.registerFormActive = false;
                utils.card_show_hide($login_card,undefined,login_form_show,undefined);
            };

            $scope.registerForm = function($event) {
                $event.preventDefault();
                $scope.registerFormActive = true;
                utils.card_show_hide($login_card,undefined,register_form_show,undefined);
            };

            $scope.passwordReset = function($event) {
                $event.preventDefault();
                utils.card_show_hide($login_card,undefined,password_reset_show,undefined);
            };

            $scope.login = function() {
                $scope.loginError = {};

                if ($scope.login_form.login_username.$valid && $scope.login_form.login_password.$valid) {
                    apiBartimeus.login($scope.login_name, $scope.login_password, function(response){
                        $scope.loginError = response;
                        $scope.$apply();
                    })
                }
            };

            $scope.signup = function() {
                $.ajax({
                    url: "http://projectpep.herokuapp.com/users/signup",
                    type: "POST",
                    data: { 'name': $scope.register_name, 'password': $scope.register_password },
                    success: function(data) {
                        if (data.success === true) {
                            console.log(data);

                            //login after successful register
                            $scope.login_name = $scope.register_name;
                            $scope.login_password = $scope.register_password;

                            $scope.login();
                        } else {
                            console.log({ message: 'signup failed' });
                            return data.message;
                        }
                    },
                    dataType: "json"
                });
            };

        }
    ]);