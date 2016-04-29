/*
*  Altair Admin AngularJS
*/
;"use strict";

var altairApp = angular.module('altairApp', [
    'ui.router',
    'oc.lazyLoad',
    'ngSanitize',
    'ngAnimate',
    'ngRetina',
    'ConsoleLogger'
]);

altairApp.constant('variables', {
    header__main_height: 48,
    easing_swiftOut: [ 0.4,0,0.2,1 ],
    bez_easing_swiftOut: $.bez([ 0.4,0,0.2,1 ])
});

altairApp.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**',
        'https://w.soundcloud.com/**'
    ]);
});

altairApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;

    $httpProvider.interceptors.push(function() {
        return {
            request: function(config) {
                var token = localStorage.getItem("token");
                if (token != null) {
                    $.ajaxSetup({
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader("x-access-token", token);
                        }
                    });
                }
                return config;
            }
        };
    });
}]);

/* Run Block */
altairApp
    .run([
        '$rootScope',
        '$state',
        '$stateParams',
        '$http',
        '$window',
        '$timeout',
        'preloaders',
        'variables',
        'apiBartimeus',
        function ($rootScope, $state, $stateParams,$http,$window, $timeout,variables, apiBartimeus) {
            $rootScope.initialized = false;
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            $rootScope.$on('$stateChangeSuccess', function () {
                // scroll view to top
                $("html, body").animate({
                    scrollTop: 0
                }, 200);

                $timeout(function() {
                    $rootScope.pageLoading = false;
                    $($window).resize();
                },300);

                $timeout(function() {
                    $rootScope.pageLoaded = true;
                    $rootScope.appInitialized = true;
                },600);

            });

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                //admin pages restriction
                if (toParams.hasOwnProperty('isAdmin') && localStorage.token == null) {
                    event.preventDefault();
                    $state.go('login');
                }
                
                // main search
                $rootScope.mainSearchActive = false;
                // single card
                $rootScope.headerDoubleHeightActive = false;
                // top bar
                $rootScope.toBarActive = false;
                // page heading
                $rootScope.pageHeadingActive = false;

                if (toState.name.indexOf('bartimeus') > -1) {//if tostate contains bartimeus its frontend, so fullheader and top menu
                    // top menu
                    $rootScope.topMenuActive = true; //set to true for top header
                    // full header
                    $rootScope.fullHeaderActive = true; //set to true for top header
                } else {
                    // top menu
                    $rootScope.topMenuActive = false; //set to true for top header
                    // full header
                    $rootScope.fullHeaderActive = false; //set to true for top header
                }

                // full height
                $rootScope.page_full_height = false;
                // secondary sidebar
                $rootScope.sidebar_secondary = false;
                $rootScope.secondarySidebarHiddenLarge = false;

                if($($window).width() < 1220 ) {
                    // hide primary sidebar
                    $rootScope.primarySidebarActive = false;
                    $rootScope.hide_content_sidebar = false;
                }
                if(!toParams.hasOwnProperty('hidePreloader')) {
                    $rootScope.pageLoading = true;
                    $rootScope.pageLoaded = false;
                }
            });

            // fastclick (eliminate the 300ms delay between a physical tap and the firing of a click event on mobile browsers)
            FastClick.attach(document.body);

            // get version from package.json
            $http.get('./package.json').success(function(response) {
                $rootScope.appVer = response.version;
            });

            // modernizr
            $rootScope.Modernizr = Modernizr;

            // get window width
            var w = angular.element($window);
            $rootScope.largeScreen = w.width() >= 1220;

            w.on('resize', function() {
                return $rootScope.largeScreen = w.width() >= 1220;
            });

            // show/hide main menu on page load
            $rootScope.primarySidebarOpen = ($rootScope.largeScreen) ? true : false;

            $rootScope.pageLoading = true;

        }
    ])
    .run([
        'PrintToConsole',
        function(PrintToConsole) {
            // app debug
            PrintToConsole.active = false;
        }
    ])
;