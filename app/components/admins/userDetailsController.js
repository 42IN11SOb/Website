angular
    .module('altairApp')
    .controller('userDetailsCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        'apiBartimeus',
        'user_data',
        'seasons_data',
        'figures_data',
        function ($rootScope, $scope, $state, apiBartimeus, user_data, seasons_data, figures_data) {
            $(function() {
                $scope.seasons = seasons_data;
                $scope.figures = figures_data;
                $scope.user = user_data;
            });

            $scope.saveUser = function() {
                var user = $scope.user;
                var season = user.passport.season._id;
                var figure = user.passport.figure._id;

                //delete user._id;
                delete user.__v;
                //delete user.passport._id;
                delete user.passport.__v;
                delete user.passport.season;
                delete user.passport.figure;

                user.passport.season = season;
                user.passport.figure = figure;

                apiBartimeus.updateItem("users", user._id, JSON.stringify(user));
                apiBartimeus.updateItem("passports", user.passport._id, JSON.stringify(user.passport));
                $state.go('admin.users');
            }
        }
    ]);