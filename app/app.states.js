altairApp
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            $urlRouterProvider
                .when('/', '/page/news')
                .otherwise('/');

            $stateProvider
            // -- ERROR PAGES --
                .state("error", {
                    url: "/error",
                    templateUrl: 'app/views/error.html'
                })
                .state("error.404", {
                    url: "/404",
                    templateUrl: 'app/components/pages/error_404View.html'
                })
                .state("error.500", {
                    url: "/500",
                    templateUrl: 'app/components/pages/error_500View.html'
                })
            // -- LOGIN PAGE --
                .state("oldlogin", {
                    url: "/old/login",
                    templateUrl: 'app/components/pages/loginView.html',
                    controller: 'loginCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_iCheck',
                                'app/components/pages/loginController.js'
                            ]);
                        }]
                    }
                })
            // -- LOGIN PAGE BATRIMEUS --
                .state("login", {
                    url: "/login",
                    templateUrl: 'app/components/login/loginView.html',
                    controller: 'loginCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_iCheck',
                                'lazy_parsleyjs',
                                'app/components/login/loginController.js'
                            ]);
                        }]
                    }
                })
            // -- BARTIMEUS --
                .state("bartimeus", {
                    abstract: true,
                    url: "/",
                    views: {
                        'main_header': {
                            templateUrl: 'app/shared/header/bartimeus_headerView.html',
                            controller: 'main_headerCtrl'
                        },
                        '': {
                            templateUrl: 'app/views/bartimeus.html',
                            //controller: 'bartimeusCtrl'
                        },
                        'main_footer': {
                            templateUrl: 'app/shared/footer/bartimeus_footerView.html',
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_selectizeJS',
                                'lazy_switchery',
                                'lazy_prismJS',
                                'lazy_autosize',
                                'lazy_iCheck',
                                //'app/components/visitors/bartimeusController.js'
                            ],{ serie: true });
                        }],
                        user_data: function($rootScope, apiBartimeus, $q) {
                            //if fromstate = login, dont run this it will give weird role results
                            if ($rootScope.fromState != 'login') {
                                var deferred = $q.defer();

                                apiBartimeus.getRole(function(role) {
                                    console.log(role);
                                    $rootScope.role = role == null ? null : role.name;
                                    deferred.resolve(role);
                                });

                                return deferred.promise;
                            } else $rootScope.fromstate = null;
                        }
                    }
                })
            // -- INDEX --
                .state("bartimeus.content", {
                    url: "page/:name",
                    templateUrl: 'app/components/visitors/contentView.html',
                    controller: 'contentCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/visitors/contentController.js'
                            ], { serie: true });
                        }],
                        page_data: function($stateParams, apiBartimeus, $q) {
                            var deferred = $q.defer();

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
                                    deferred.resolve({ content: news });
                                });
                            } else {
                                apiBartimeus.getItem("pages", $stateParams.name, function(item) {
                                    deferred.resolve(item);
                                });
                            }

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: ''
                    }
                })
            // -- PROFIEL --
                .state("bartimeus.profiel", {
                    url: "profile",
                    templateUrl: 'app/components/users/profielView.html',
                    controller: 'profielCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_KendoUI',
                                'app/components/users/profielController.js'
                            ], { serie: true });
                        }],
                        profile_data: function(apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getProfile(function(profile) {
                                deferred.resolve(profile);
                            });

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: 'profiel'
                    }
                })
            // -- PEP signup --
                .state("bartimeus.signup", {
                    url: "pepsignup",
                    templateUrl: 'app/components/users/signupPepView.html',
                    controller: 'signupPepCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_KendoUI',
                                'app/components/users/signupPepController.js'
                            ], { serie: true });
                        }],
                        pep_data: function(apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getItems("pepdagdates", function(peps) {
                                deferred.resolve(peps);
                            });

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: 'aanmelden'
                    }
                })
            // -- BARTIMEUS ADMIN --
                .state("admin", {
                    abstract: true,
                    url: "/admin",
                    views: {
                        'main_header': {
                            templateUrl: 'app/shared/header/admin_headerView.html',
                            controller: 'main_headerCtrl'
                        },
                        'main_sidebar': {
                            templateUrl: 'app/shared/main_sidebar/main_sidebarView.html',
                            controller: 'main_sidebarCtrl'
                        },
                        '': {
                            templateUrl: 'app/views/bartimeusAdmin.html',
                            //controller: 'bartimeusCtrl'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_selectizeJS',
                                'lazy_switchery',
                                'lazy_prismJS',
                                'lazy_autosize',
                                'lazy_iCheck',
                                //'app/components/admins/bartimeusController.js'
                            ],{ serie: true });
                        }],
                        user_data: function($rootScope, apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getRole(function(role) {
                                console.log(role);
                                $rootScope.role = role == null ? null: role.name;
                                deferred.resolve(role);
                            });

                            return deferred.promise;
                        }
                    },
                    params: { isAdmin: true } //set this param to set page as admin page
                })
            // -- ADMIN INDEX --
                .state("admin.index", {
                    url: "/index",
                    templateUrl: 'app/components/admins/indexView.html',
                    controller: 'indexCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/admins/indexController.js'
                            ], { serie: true });
                        }]
                    },
                    data: {
                        pageTitle: 'Index',
                    }
                })
            // -- ADMIN PAGE LIST --
                .state("admin.pages", {
                    url: "/pages",
                    templateUrl: 'app/components/admins/pageListView.html',
                    controller: 'pageListCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_tablesorter',
                                'app/components/admins/pageListController.js'
                            ], {serie:true});
                        }],
                        pages_data: function(apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getItems("pages", function(pages) {
                                deferred.resolve(pages);
                            });

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: 'Pages'
                    }
                })
            // -- ADMIN PAGE CONTENT --
                .state("admin.pagecontent", {
                    url: "/pages/:name",
                    templateUrl: 'app/components/admins/pageContentView.html',
                    controller: 'pageContentCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_tinymce',
                                'app/components/admins/pageContentController.js'
                            ], {serie:true});
                        }],
                        page_data: function($stateParams, apiBartimeus, $q) {
                           var deferred = $q.defer();

                           apiBartimeus.getItem("pages", $stateParams.name, function(item) {
                               deferred.resolve(item);
                           });

                           return deferred.promise;
                       }
                    },
                    data: {
                        pageTitle: 'Pages'
                    }
                })
            // -- ADMIN NEWS LIST --
                .state("admin.news", {
                    url: "/news",
                    templateUrl: 'app/components/admins/newsListView.html',
                    controller: 'newsListCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_tablesorter',
                                'app/components/admins/newsListController.js'
                            ], {serie:true});
                        }],
                        news_data: function(apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getItems("news", function(newses) {
                                deferred.resolve(newses);
                            });

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: 'News'
                    }
                })
            // -- ADMIN NEWS CONTENT --
                .state("admin.newscontent", {
                    url: "/news/:name",
                    templateUrl: 'app/components/admins/newsContentView.html',
                    controller: 'newsContentCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_tinymce',
                                'app/components/admins/newsContentController.js'
                            ], {serie:true});
                        }],
                        news_data: function($stateParams, apiBartimeus, $q){
                            var deferred = $q.defer();

                            apiBartimeus.getItem("news", $stateParams.name, function(news) {
                                deferred.resolve(news);
                            });

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: 'News'
                    }
                })
            // -- ADMIN SEASON LIST --
                .state("admin.seasons", {
                    url: "/seasons",
                    templateUrl: 'app/components/admins/seasonListView.html',
                    controller: 'seasonListCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_tablesorter',
                                'app/components/admins/seasonListController.js'
                            ], {serie:true});
                        }],
                        seasons_data: function(apiBartimeus, $q){
                            var deferred = $q.defer();

                            apiBartimeus.getItems("seasons", function(seasons) {
                                deferred.resolve(seasons);
                            });

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: 'Seasons'
                    }
                })
            // -- ADMIN SEASON COLORS --
                .state("admin.seasoncolors", {
                    url: "/seasons/:name",
                    templateUrl: 'app/components/admins/seasonColorsView.html',
                    controller: 'seasonColorsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/admins/seasonColorsController.js'
                            ], {serie:true});
                        }],
                        season_data: function($stateParams, apiBartimeus, $q) {
                                var deferred = $q.defer();

                                apiBartimeus.getItem("seasons", $stateParams.name, function(season) {
                                    deferred.resolve(season);
                                });

                                return deferred.promise;
                            },
                        colors_data: function(apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getItems("colors", function(colors) {
                                deferred.resolve(colors);
                            });

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: 'Season Colors'
                    }
                })
            // -- ADMIN COLORS FOR SEASONS --
                .state("admin.colors", {
                    url: "/colors",
                    templateUrl: 'app/components/admins/colorListView.html',
                    controller: 'colorListCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_tablesorter',
                                'app/components/admins/colorListController.js'
                            ], {serie:true});
                        }],
                        colors_data: function(apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getItems("colors", function(colors) {
                                deferred.resolve(colors);
                            });

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: 'Colors'
                    }
                })
            // -- ADMIN COLORS FOR SEASONS --
                .state("admin.colordetails", {
                    url: "/colors/:name",
                    templateUrl: 'app/components/admins/colorDetailsView.html',
                    controller: 'colorDetailsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_wheelcolorpicker',
                                'app/components/admins/colorDetailsController.js'
                            ], {serie:true});
                        }],
                        color_data: function($stateParams, apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getItem("colors", $stateParams.name, function(color) {
                                deferred.resolve(color);
                            });

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: 'Color details'
                    }
                })
            // -- ADMIN FIGURES LIST --
                .state("admin.figures", {
                    url: "/figures",
                    templateUrl: 'app/components/admins/figureListView.html',
                    controller: 'figureListCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_tablesorter',
                                'app/components/admins/figureListController.js'
                            ], {serie:true});
                        }],
                        figures_data: function(apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getItems("figures", function(figures) {
                                deferred.resolve(figures);
                            });

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: 'Figures'
                    }
                })
            // -- ADMIN FIGURE DETAILS --
                .state("admin.figuredetails", {
                    url: "/figures/:name",
                    templateUrl: 'app/components/admins/figureDetailsView.html',
                    controller: 'figureDetailsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/admins/figureDetailsController.js'
                            ], {serie:true});
                        }],
                        figure_data: function($stateParams, apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getItem("figures", $stateParams.name, function(figure) {
                                deferred.resolve(figure);
                            });

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: 'Figure Details'
                    }
                })
            // -- ADMIN USERS LIST --
                .state("admin.users", {
                    url: "/users",
                    templateUrl: 'app/components/admins/userListView.html',
                    controller: 'userListCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {   
                            return $ocLazyLoad.load([
                                'lazy_tablesorter',
                                'app/components/admins/userListController.js'
                            ], {serie:true});
                        }],
                        users_data: function(apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getItems("users", function(users) {
                                deferred.resolve(users);
                            });

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: 'Users'
                    }
                })
            // -- ADMIN USER DETAILS --
                .state("admin.userdetails", {
                    url: "/users/:name",
                    templateUrl: 'app/components/admins/userDetailsView.html',
                    controller: 'userDetailsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/admins/userDetailsController.js'
                            ], {serie:true});
                        }],
                        user_data: function($stateParams, apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getItem("users", $stateParams.name, function(user) {
                                deferred.resolve(user);
                            });

                            return deferred.promise;
                        },
                        seasons_data: function(apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getItems("seasons", function(seasons) {
                                deferred.resolve(seasons);
                            });

                            return deferred.promise;
                        },
                        figures_data: function(apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getItems("figures", function(figures) {
                                deferred.resolve(figures);
                            });

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: 'User Details'
                    }
                })
            // -- ADMIN REGISTER USER --
                .state("admin.register", {
                    url: "/register",
                    templateUrl: 'app/components/admins/addUserProfileView.html',
                    controller: 'userProfileCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_wizard',
                                'app/components/admins/addUserProfileController.js'
                            ], {serie:true});
                        }]
                    },
                    data: {
                        pageTitle: 'Register'
                    }
                })
            // -- ADMIN PEP LIST --
                .state("admin.pep", {
                    url: "/pep",
                    templateUrl: 'app/components/admins/pepListView.html',
                    controller: 'pepListCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {   
                            return $ocLazyLoad.load([
                                'lazy_tablesorter',
                                'app/components/admins/pepListController.js'
                            ], {serie:true});
                        }],
                        peps_data: function(apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getItems("pepdagdates", function(peps) {
                                deferred.resolve(peps);
                            });

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: 'PEPdagen'
                    }
                })
            // -- ADMIN PEP DETAILS --
                .state("admin.pepdetails", {
                    url: "/pep/:id",
                    templateUrl: 'app/components/admins/pepDetailsView.html',
                    controller: 'pepDetailsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/admins/pepDetailsController.js'
                            ], {serie:true});
                        }],
                        pep_data: function($stateParams, apiBartimeus, $q) {
                            var deferred = $q.defer();

                            apiBartimeus.getItem("pepdagdates", $stateParams.id, function(pep) {
                                pep.users = [];
                                apiBartimeus.getItems("pepdag", function(pepuser) {
                                    for(var i in pepuser){
                                        if(pepuser[i].voorkeursdatum === $stateParams.id){
                                            pep.users.push(pepuser[i]);
                                        }
                                    }
                                    deferred.resolve(pep);
                                });
                            });

                            return deferred.promise;
                        }
                    },
                    data: {
                        pageTitle: 'PEPdag Details'
                    }
                })

                //to get rid of /#/
            //$locationProvider.html5Mode({enabled:true,requireBase:false});
        }
    ]);
