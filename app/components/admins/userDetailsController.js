angular
    .module('altairApp')
    .controller('userDetailsCtrl', [
        '$rootScope',
        '$scope',
        '$stateParams',
        '$state',
        'apiBartimeus',
        'user_data',
        function ($rootScope, $scope, $stateParams, $state, apiBartimeus, user_data) {
            $scope.seasons = [];
            $scope.figures = [];

            function getUser(){
                apiBartimeus.getItem("users", $stateParams.name, function(user) {
                    $scope.user = user;
                    $scope.$apply();
                });
            }
            function getSeasons() {
                apiBartimeus.getItems("seasons", function(seasons) {
                    for(var i in seasons){
                        $scope.seasons.push({
                            name: seasons[i].name,
                            id: seasons[i]._id
                        });
                    }
                });
            }
            function getFigures() {
                apiBartimeus.getItems("figures", function(figures) {
                    for(var i in figures){
                        $scope.figures.push({
                            name: figures[i].title,
                            id: figures[i]._id
                        });
                    }
                });
            }

            $(function() {
                getSeasons();
                getFigures();
                //getUser();
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