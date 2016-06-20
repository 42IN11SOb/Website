altairApp
    //api wrapper
    .factory('apiBartimeus', [
        '$state',
        '$rootScope',
        function($state, $rootScope) {
            return {
                login: function(username, password, callback) {
                    var retVal;

                    $.ajax({
                        url: "http://projectpep.herokuapp.com/users/login",
                        type: "POST",
                        data: { 'username': username, 'password': password },
                        success: function(data) {
                            var data = data.data;
                            
                            if (data.success === true) {
                                localStorage.setItem("token", data.token);
                                $rootScope.role = data.profile.role.name;
                                //set fromstate to login, to prevent getRole call on state change
                                $rootScope.fromState = 'login';
                                $state.go('bartimeus.content', {name : 'Home'});
                            } else {
                                retVal = data;
                            }
                            callback(retVal);
                        },
                        error: function(data) {
                            //show error message
                            retVal = {
                                status: true,
                                message: "Something went wrong, login again."
                            }
                            callback(retVal);
                        },
                        dataType: "json"
                    });
                },
                logout: function() {
                    $.ajax({
                        url: "http://projectpep.herokuapp.com/users/logout",
                        type: "POST",
                        success: function(data) {console.log(data);
                            if (data.success === true) {
                                localStorage.removeItem("token");
                                $rootScope.role = null;
                                $rootScope.$apply();
                                $state.go('bartimeus.content', {name : 'Home'});
                            }
                        },
                        error: function(data) {
                            //show error message
                        }
                    });
                },
                loggedIn: function(checkApi) {
                    //this function is called alot, to prevent flood on api just return true when token is defined. if token is false you should return to login page (after its expried, or server rebooted)
                    if(!checkApi) return localStorage.getItem("token") != null;

                    if (checkApi) {
                        $.ajax({
                            url: "http://projectpep.herokuapp.com/users/loggedIn",
                            type: "GET",
                            success: function(data) {
                                return data.success;
                            },
                        });
                    }
                },
                rgbToHex: function(r, g, b) {
                    function componentToHex(c) {
                        var hex = c.toString(16);
                        return hex.length == 1 ? "0" + hex : hex;
                    }

                    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
                },
                hexToRgb: function(hex) {
                    hex = hex.replace(/[^0-9A-F]/gi, '');
                    var bigint = parseInt(hex, 16);
                    var r = (bigint >> 16) & 255;
                    var g = (bigint >> 8) & 255;
                    var b = bigint & 255;

                    return { r: r, g: g, b: b };
                },
                getRole: function(callback) {
                    $.ajax({
                        url: "http://projectpep.herokuapp.com/users/profile",
                        type: "GET",
                        success: function(profile) {
                            console.log(profile);
                            if (profile.success === true) {
                                callback(profile.data.role);
                            } else {
                                callback(null);
                            }
                        }
                    });
                },
                getProfile: function(callback) {
                    $.ajax({
                        url: "http://projectpep.herokuapp.com/users/profile",
                        type: "GET",
                        success: function(profile) {
                            if (profile.success != true) {
                                //user not logged in or token expired
                                $state.go('login');
                            } else {
                                callback(profile.data);
                            }
                        }
                    });
                },
                getItems : function(type, callback) {
                    $.ajax({
                        url: "http://projectpep.herokuapp.com/" + type,
                        type: "GET",
                        success: function(items){
                            if(items.success === true){
                                if(callback) callback(items.data)
                                return items.data;
                           } else return items;
                        },
                        dataType: "json"
                    })
                },
                getItem : function(type, name, callback) {
                    $.ajax({
                        url: "http://projectpep.herokuapp.com/" + type + "/" + name,
                        type: "GET",
                        success: function(item){
                            if(item.success === true){
                                if(callback) callback(item.data)
                                return item.data;
                           } else return item;
                        },
                        dataType: "json"
                    })
                },
                createItem : function(type, name, callback) {
                    $.ajax({
                        url: "http://projectpep.herokuapp.com/" + type,
                        type: "POST",
                        data: (type === 'figures' ? {title : name} : { name: name }),
                        success: function(item){
                            if(item.success === true){
                                if(callback) callback(item.data);
                                return item.data;
                            } else return item;
                        },
                        dataType: "json"
                    })
                },
                createItemObject : function(type, object, callback) {
                    $.ajax({
                        url: "http://projectpep.herokuapp.com/" + type,
                        type: "POST",
                        data: object,
                        contentType: (type === 'passport') ? "application/json": "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function(item) {
                            if (item.success === true) {
                                if(callback) callback(item.data);
                                return item.data;
                            } else return item;
                        },
                        dataType: 'json'
                    })
                },
                updateItem : function(type, name, item, callback) {
                    $.ajax({
                        url: "http://projectpep.herokuapp.com/" + type + "/" + name,
                        type: "PUT",
                        data: item,
                        contentType: (type === 'colors' || type === 'pages' || type === 'news' || type === 'pepdagdates') ? "application/x-www-form-urlencoded; charset=UTF-8" : "application/json",
                        success: function(item){
                            if(item.success === true){
                                if(callback) callback(item.data);
                                return item.data;
                            } else return item;
                        },
                        dataType: "json"
                    })
                },
                deleteItem : function(type, name, callback) {
                    $.ajax({
                        url: "http://projectpep.herokuapp.com/" + type + "/" + name,
                        type: "DELETE",
                        success: function(item){
                            if(item.success === true){
                                if(callback) callback(item.data);
                                return item.data;
                            } else return item;
                        },
                        dataType: "json"
                    })
                },
                getAdminSections: function() {
                    return [{
                        title: 'Gebruikers',
                        icon: '&#xE87C;',
                        link: 'admin.users'
                    },{
                        title: 'PEPdag',
                        icon: '&#xE8A3;',
                        link: 'admin.pep'
                    }, {
                        title: "Pagina's",
                        icon: '&#xE24D;',
                        link: 'admin.pages'
                    }, {
                        title: "Nieuws",
                        icon: '&#xE8B0;',
                        link: 'admin.news'
                    }, {
                        title: 'Seizoenen',
                        icon: '&#xE545;',
                        link: 'admin.seasons'
                    }, {
                        title: 'Kleuren',
                        icon: '&#xE40A;',
                        link: 'admin.colors'
                    }, {
                        title: 'Figuren',
                        icon: '&#xE84E;',
                        link: 'admin.figures'
                    }];
                }
            }
        }
    ])
    .factory('windowDimensions', [
        '$window',
        function($window) {
            return {
                height: function() {
                    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                },
                width: function() {
                    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                }
            }
        }
    ])
    .factory('utils', function () {
        return {
            // Util for finding an object by its 'id' property among an array
            findByItemId: function findById(a, id) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].item_id == id) return a[i];
                }
                return null;
            },
            // serialize form
            serializeObject: function(form) {
                var o = {};
                var a = form.serializeArray();
                $.each(a, function() {
                    if (o[this.name] !== undefined) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            },
            // high density test
            isHighDensity: function() {
                return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
            },
            // touch device test
            isTouchDevice: function() {
                return !!('ontouchstart' in window);
            },
            // local storage test
            lsTest: function() {
                var test = 'test';
                try {
                    localStorage.setItem(test, test);
                    localStorage.removeItem(test);
                    return true;
                } catch(e) {
                    return false;
                }
            },
            // show/hide card
            card_show_hide: function(card,begin_callback,complete_callback,callback_element) {
                $(card).velocity({
                        scale: 0,
                        opacity: 0.2
                    }, {
                        duration: 400,
                        easing: [ 0.4,0,0.2,1 ],
                        // on begin callback
                        begin: function () {
                            if (typeof begin_callback !== 'undefined') {
                                begin_callback(callback_element);
                            }
                        },
                        // on complete callback
                        complete: function () {
                            if (typeof complete_callback !== 'undefined') {
                                complete_callback(callback_element);
                            }
                        }
                    })
                    .velocity('reverse');
            }
        };
    })
;

angular
    .module("ConsoleLogger", [])
    // router.ui debug
    // app.js (run section "PrintToConsole")
    .factory("PrintToConsole", [
        "$rootScope",
        function ($rootScope) {
            var handler = { active: false };
            handler.toggle = function () { handler.active = !handler.active; };

            if (handler.active) {
                console.log($state + ' = ' + $state.current.name);
                console.log($stateParams + '=' + $stateParams);
                console.log($state_full_url + '=' + $state.$current.url.source);
                console.log(Card_fullscreen + '=' + card_fullscreen);
            }

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (handler.active) {
                    console.log("$stateChangeStart --- event, toState, toParams, fromState, fromParams");
                    console.log(arguments);
                }
            });
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                if (handler.active) {
                    console.log("$stateChangeError --- event, toState, toParams, fromState, fromParams, error");
                    console.log(arguments);
                }
            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (handler.active) {
                    console.log("$stateChangeSuccess --- event, toState, toParams, fromState, fromParams");
                    console.log(arguments);
                }
            });
            $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
                if (handler.active) {
                    console.log("$viewContentLoading --- event, viewConfig");
                    console.log(arguments);
                }
            });
            $rootScope.$on('$viewContentLoaded', function (event) {
                if (handler.active) {
                    console.log("$viewContentLoaded --- event");
                    console.log(arguments);
                }
            });
            $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
                if (handler.active) {
                    console.log("$stateNotFound --- event, unfoundState, fromState, fromParams");
                    console.log(arguments);
                }
            });
            return handler;
        }
    ])
;