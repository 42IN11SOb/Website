angular
    .module('altairApp')
    .controller('userDetailsCtrl', [
        '$rootScope',
        '$scope',
        '$stateParams',
        '$state',
        'apiBartimeus',
        function ($rootScope, $scope, $stateParams, $state, apiBartimeus) {
            $scope.seasons = [];
            $scope.figures = [];

            function getUser(){
                apiBartimeus.getUser($stateParams.name, function(user) {
                    $scope.user = user;
                    $scope.$apply();
                });
            }
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

            $(function() {
                getSeasons();
                getFigures();
                getUser();
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

                apiBartimeus.updateUser(user._id, JSON.stringify(user));
                apiBartimeus.updatePassport(user.passport._id, JSON.stringify(user.passport));
                $state.go('admin.users');
            }
        }
    ]);