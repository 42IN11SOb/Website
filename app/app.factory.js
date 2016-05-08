altairApp
    //api wrapper
    .factory('apiBartimeus', [
        '$state',
        '$rootScope',
        function($state, $rootScope) {
                var ervaringsverhalen = [{
                                title: 'Ervaringsverhalen',
                                text: 'Deelnemers van verschillende Pep-dagen hebben in onderstaande video vragen beantwoord over de dagen.<p><iframe src="//www.youtube.com/embed/nRUx7HqVmdI" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>'
                            }, {
                                title: 'Annet (44) blind',
                                text: '<h3>‘Ik durf me weer te laten zien’</h3><p>Mijn ‘oude ik’ uit de tijd dat ik nog goed kon zien is is weer naar boven gekomen. Na de PEP-dag straalde ik van oor tot oor en ik wilde opnieuw gezien worden. Mijn zelfvertrouwen heb ik terug gekregen. Kleding en make-up is weer belangrijker voor me geworden.&nbsp; Het heeft me een nieuwe baan opgeleverd die ik daarvoor waarschijnlijk niet had aangenomen. In mijn vertrouwde winkel durven verkopers mij meer afwisselende kledingstukken te adviseren. De kleurenkaart en de adviezen van de stylist komen dan goed van pas. Mensen in mijn omgeving zijn verbaasd over de manier waarop ik me nu kleed of opmaak. Ik heb mijn stijl weer teruggevonden!”</p>'
                            }, {
                                title: 'Dorry (60) slechtziend',
                                text: '<h2>Dorry (60) slechtziend</h2><p>“Uiterlijke verzorging vond ik altijd belangrijk. Eerst ging dit vooral om kleding en sieraden maar later hoorde make-up daar ook bij. Wel was ik er héél voorzichtig mee, want het kon gemakkelijk fout gaan en dat zou mijn slechtziendheid alleen maar accentueren. De PEP-dag van Bartiméus kwam als een verrassing! Samen met andere slechtziende vrouwen ga je op zoek naar de stijl- en kleurcombinaties die het beste bij jou passen. De visagiste liet me ervaren hoe je met enkele handigheidjes zelf goede make-up kunt aanbrengen. De respectvolle benadering was zeer fijn. Daardoor was de sfeer relaxed en de interactie in de groep levendig en motiverend.”</p>'
                            }, {
                                title: 'Laura (33) blind',
                                text: '<h3>‘Mooi zijn doe je voor jezelf!’</h3><p>“Soms heb ik het idee dat we onze visuele beperking moeten compenseren met pittige kleding en make-up. Het algemene beeld dat er bestaat over dat je maar beter gemakkelijke kleding kunt dragen als je toch niets ziet is onzin. Wij mogen ook mooi zijn en er leuk uitzien! Dat doe je in de eerste plaats voor jezelf. Soms is het lastig om te bedenken hoe je jouw mooie kanten kunt benadrukken. Op deze dag leer je hoe je dat doet. Er was persoonlijke aandacht voor de doelgroep en dat is vind ik echt belangrijk.’’</p>'
                            }];
                var index = [{
                                title: '‘Straal uit wie je bent’',
                                text: '<img class="klein" src="/wp-content/uploads/2014/04/unnamed.png" alt="Vrouw met make-up oogschaduw palet aan de rechterkant van haar gezicht, links kwasten om op te maken" width="60%"><p>Er goed uitzien is voor iemand met een visuele beperking niet minder belangrijk. Het benadrukt de sterke kanten van je persoonlijkheid en maakt je oogverblindend mooi. ‘Oogverblindend Mooi’ is een initiatief van Bartiméus en inspireert over jouw kleur en stijl. Met persoonlijke kleuradvies en je persoonlijke kracht werken we aan je PEP: Persoonlijke Effectieve Presentatie!</p><p>We organiseren regelmatig een gezellige PEP- dag waar onze professionele stylist en visagist je een uitgebreid stylingadvies geven. Twijfel je ook wel eens of die ene spijkerbroek wel staat, of over welke kleur jou echt laat stralen? Zet die twijfel aan de kant en trakteer jezelf op een inspirerende dag waarbij je alles leert over jouw eigen stijl en de kleuren die jou laten stralen! </p>'
                            }, {
                                title: 'De winnaars van de loterij op de ZieZo beurs zijn:',
                                text: '<ul><li>Donderdag: Elma Gelens</li><li>Vrijdag: Anna Kruithof</li><li>Zaterdag: Shirley Maasland</li></ul><p>Gefeliciteerd! Veel plezier op de PEP dag.</p>'
                            }, {
                                title: 'Uiterlijk is niet belangrijk?',
                                text: '<p>‘Hé ik zie dat je bent opgemaakt, staat je goed. Kun je dat nog wel zelf? En zie je dan ook het resultaat?’</p><p>Dit is een vraag die Karin vaak heeft gehoord. Ben je benieuwd naar haar verhaal? Je leest het hier.</p><a ui-sref="bartimeus.pepdag" class="md-btn md-btn-small md-btn-primary">lees meer</a>'
                            }];
                var pepdag = [{
                                title: 'PEPdag',
                                subTitle: 'Er is geen tweede kans om een eerste indruk te maken!',
                                text: '<p>Hoeveel tijd besteed jij aan je uiterlijk? Blind of slechtziend wil niet zeggen dat dit niet belangrijk is. Straal jij uit wat je uit wilt stralen, of twijfel je wel eens daarover? Wat voor indruk maak jij? Hoe zien anderen jou? Straal jij uit wat je uit wilt stralen, of twijfel je wel eens daarover? Wat voor indruk maak jij? Hoe zien anderen jou? Dit zijn vragen die gaan over jouw Persoonlijke Effectieve Presentatie.</p>',
                                subItems: [{
                                    title: 'Voor wie',
                                    text: '<p>Deze oppepper is voor blinde of slechtziende vrouwen, jong of al iets ouder. Voor iedereen die advies en tips wil en mooi opgepept wil worden.</p>'
                                }, {
                                    title: 'Programma PEP-dag',
                                    text: '<p>Tijdens deze dag ga je aan de slag met Ilona Luca, professionele kleurenstyliste, Janneke van der Pijl, professionele visagiste, maatschappelijk werker en ergotherapeut vanuit Bartiméus.</p><p>Je wordt mee op reis genomen om zelf te onderzoeken welke kleur en kledingstijl bij jou past. Hiermee leer je de sterke kanten van jouw persoonlijkheid te benadrukken. Je gaat je zekerder voelen omdat je tips krijgt hoe je dat effect kunt bereiken. Daarnaast krijg je een uitgebreide workshop waarbij je zelf aan de slag gaat met make-up. Uiteraard besteden we ook aandacht aan non-visuele technieken. Ook is er tijdens deze dag ruimte om met elkaar in contact te komen en van gedachten te wisselen.</p><p>Een boeiende, gezellige en leerzame dag die jouw persoonlijke presentatie succesvol maakt, niet alleen in dat sollicitatiegesprek, maar ook in jouw netwerk, familie en vriendenkring.</p>'
                                }, {
                                    title: 'Resultaat',
                                    text: '<p>Persoonlijk Professioneel kleur- en stijladvies<br/>Leren om je (non-visueel) op te maken<br/>Inzicht in persoonlijke presentatie<br/>Gezellige, boeiende en leerzame dag</p>'
                                }, {
                                    title: 'Data',
                                    text: '<p>De training wordt gehouden op basis van voldoende aanmeldingen. Schrijf je daarom nu in!</p>'
                                }, {
                                    title: 'Locatie',
                                    text: '<p>Bij Bartiméus in Amsterdam, Deventer, Hengelo, Den Haag, Ermelo, Zeist, Vught en Rotterdam.</p>'
                                }, {
                                    title: 'Kosten',
                                    text: '<p>Komt u in aanmerking voor revalidatie en heeft u een verwijzing van een specialist, dan vergoedt uw zorgverzekeraar de kosten. De kosten van revalidatie voor cliënten van 18 jaar en ouder bij Bartiméus vallen onder (het eigen risico van) de basisverzekering.</p><p>Voor de PEPdag heeft u een geldig behandelplan nodig van uw behandelaar van Bartiméus.</p><p>Bent u oud cliënt, (niet langer dan twee jaar geleden) dan  volstaat een verwijzing van uw huisarts. U kunt een verwijsbrief downloaden en deze laten invullen.</p><p><a class="md-btn md-btn-small md-btn-primary" href="http://oogverblindendmooi.nl/wp-content/uploads/2014/04/Verwijzing-opvragen.docx">Verwijzing opvragen</a></p><p>Wilt u deze liever per post ontvangen, geef dit dan aan op het aanmeldformulier.</p><p>Deze training kan vanuit het basispakket van uw zorgverzekering vergoed worden. Wij vragen per dag €40,- voor de inzet van een professionele kleurenstylist en visagiste. </p><p>Als uw verwijsbrief ontvangen is, (2 weken voor de PEPdag) dan is uw aanmelding definitief. Mocht u onverhoopt niet aan deze dag mee kunnen doen, zijn wij genoodzaakt de kosten van € 40,- in rekening te brengen. U ontvangt voor de dag een machtiging voor de betaling.</p><p>U kunt de verwijsbrief sturen naar:  Bartiméus t.a.v. Nursel Günal,  Postbus 1003 3700 BA Zeist of ngunal@bartimeus.nl  of Fax: 030-6982275</p><p>Heeft u nog andere vragen, dan kunt u een mail sturen naar spastoor@bartimeus.nl</p><p>Tijdens de dag wordt make-up uitgebreid behandeld. Met verschillende tips en tricks maken deelnemers kennis met het opmaken. In onderstaande video wordt uitgelegd hoe je mascara kunt aanbrengen zonder gebruik te maken van een spiegel.</p><p><iframe src="//www.youtube.com/embed/yvP3mSaYzHE" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>'
                                }]
                            }];
            return {
                login: function(username, password, callback) {
                    var retVal;

                    $.ajax({
                        url: "http://localhost:3000/users/login",
                        type: "POST",
                        data: { 'username': username, 'password': password },
                        success: function(data) {
                            if (data.success === true) {
                                localStorage.setItem("token", data.token);
                                $state.go('bartimeus.content', {name : 'index'});
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
                        url: "http://localhost:3000/users/logout",
                        type: "POST",
                        success: function(data) {
                            if (data.success === true) {
                                localStorage.removeItem("token");
                                $state.go('bartimeus.content', {name : 'index'});
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
                            url: "http://localhost:3000/users/loggedIn",
                            type: "GET",
                            success: function(data) {
                                if (data.success === true) {
                                    return true;
                                } else {
                                    return false;
                                }
                            },
                        });
                    }
                },
                isAdmin: function() {
                    
                },
                getContent: function(page) {
                    switch (page) {
                        case 'index':
                            return index;
                            break;
                        case 'pepdag':
                            return pepdag;
                            break;
                        case 'ervaringsverhalen':
                            return ervaringsverhalen;
                            break;
                    }
                },
                setContent : function(page, content){
                    switch (page) {
                        case 'index':
                            index = content;
                            break;
                        case 'pepdag':
                            pepdag = content;
                            break;
                        case 'ervaringsverhalen':
                            ervaringsverhalen = content;
                            break;
                    }
                },
                getPages : function() {
                    return [{
                        title: 'home',
                        class: 'material-icons md-24',
                        name: 'index'
                    }, {
                        title: 'PEPdag',
                        name: 'pepdag'
                    }, {
                        title: 'Ervaringsverhalen',
                        name: 'ervaringsverhalen'
                    }];
                },
                getProfile : function() {
                    
                },
                getAdminSections: function() {
                    return [{
                        title: 'User Profile',
                        icon: '&#xE87C;',
                        //link: 'restricted.pages.user_profile',
                        submenu: [{
                            title: 'Regular Elements',
                            link: 'restricted.forms.regular'
                        }]
                    }, {
                        title: 'Pages',
                        icon: '&#xE24D;',
                        link: 'admin.pages'
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