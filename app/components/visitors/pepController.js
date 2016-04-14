angular
    .module('altairApp')
    .controller('pepCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$sce',
        function($rootScope, $scope, $timeout, $sce) {
            $scope.toTrustedHTML = function(html) {
                return $sce.trustAsHtml(html);
            };

            $scope.items = [
                {
                    title: 'PEPdag',
                    subTitle: 'Er is geen tweede kans om een eerste indruk te maken!',
                    text: 'Hoeveel tijd besteed jij aan je uiterlijk? Blind of slechtziend wil niet zeggen dat dit niet belangrijk is. Straal jij uit wat je uit wilt stralen, of twijfel je wel eens daarover? Wat voor indruk maak jij? Hoe zien anderen jou? Straal jij uit wat je uit wilt stralen, of twijfel je wel eens daarover? Wat voor indruk maak jij? Hoe zien anderen jou? Dit zijn vragen die gaan over jouw Persoonlijke Effectieve Presentatie.',
                    subItems: [
                        {
                            title: 'Voor wie',
                            text: '<p>Deze oppepper is voor blinde of slechtziende vrouwen, jong of al iets ouder. Voor iedereen die advies en tips wil en mooi opgepept wil worden.</p>'
                        },
                        {
                            title: 'Programma PEP-dag',
                            text: '<p>Tijdens deze dag ga je aan de slag met Ilona Luca, professionele kleurenstyliste, Janneke van der Pijl, professionele visagiste, maatschappelijk werker en ergotherapeut vanuit Bartiméus.</p><p>Je wordt mee op reis genomen om zelf te onderzoeken welke kleur en kledingstijl bij jou past. Hiermee leer je de sterke kanten van jouw persoonlijkheid te benadrukken. Je gaat je zekerder voelen omdat je tips krijgt hoe je dat effect kunt bereiken. Daarnaast krijg je een uitgebreide workshop waarbij je zelf aan de slag gaat met make-up. Uiteraard besteden we ook aandacht aan non-visuele technieken. Ook is er tijdens deze dag ruimte om met elkaar in contact te komen en van gedachten te wisselen.</p><p>Een boeiende, gezellige en leerzame dag die jouw persoonlijke presentatie succesvol maakt, niet alleen in dat sollicitatiegesprek, maar ook in jouw netwerk, familie en vriendenkring.</p>'
                        },
                        {
                            title: 'Resultaat',
                            text: '<p>Persoonlijk Professioneel kleur- en stijladvies<br/>Leren om je (non-visueel) op te maken<br/>Inzicht in persoonlijke presentatie<br/>Gezellige, boeiende en leerzame dag</p>'
                        },
                        {
                            title: 'Data',
                            text: '<p>De training wordt gehouden op basis van voldoende aanmeldingen. Schrijf je daarom nu in!</p>'
                        },
                        {
                            title: 'Locatie',
                            text: '<p>Bij Bartiméus in Amsterdam, Deventer, Hengelo, Den Haag, Ermelo, Zeist, Vught en Rotterdam.</p>'
                        },
                        {
                            title: 'Kosten',
                            text: '<p>Komt u in aanmerking voor revalidatie en heeft u een verwijzing van een specialist, dan vergoedt uw zorgverzekeraar de kosten. De kosten van revalidatie voor cliënten van 18 jaar en ouder bij Bartiméus vallen onder (het eigen risico van) de basisverzekering.</p><p>Voor de PEPdag heeft u een geldig behandelplan nodig van uw behandelaar van Bartiméus.</p><p>Bent u oud cliënt, (niet langer dan twee jaar geleden) dan  volstaat een verwijzing van uw huisarts. U kunt een verwijsbrief downloaden en deze laten invullen.</p><p><a class="md-btn md-btn-small md-btn-primary" href="http://oogverblindendmooi.nl/wp-content/uploads/2014/04/Verwijzing-opvragen.docx">Verwijzing opvragen</a></p><p>Wilt u deze liever per post ontvangen, geef dit dan aan op het aanmeldformulier.</p><p>Deze training kan vanuit het basispakket van uw zorgverzekering vergoed worden. Wij vragen per dag €40,- voor de inzet van een professionele kleurenstylist en visagiste. </p><p>Als uw verwijsbrief ontvangen is, (2 weken voor de PEPdag) dan is uw aanmelding definitief. Mocht u onverhoopt niet aan deze dag mee kunnen doen, zijn wij genoodzaakt de kosten van € 40,- in rekening te brengen. U ontvangt voor de dag een machtiging voor de betaling.</p><p>U kunt de verwijsbrief sturen naar:  Bartiméus t.a.v. Nursel Günal,  Postbus 1003 3700 BA Zeist of ngunal@bartimeus.nl  of Fax: 030-6982275</p><p>Heeft u nog andere vragen, dan kunt u een mail sturen naar spastoor@bartimeus.nl</p><p>Tijdens de dag wordt make-up uitgebreid behandeld. Met verschillende tips en tricks maken deelnemers kennis met het opmaken. In onderstaande video wordt uitgelegd hoe je mascara kunt aanbrengen zonder gebruik te maken van een spiegel.</p><p><iframe src="//www.youtube.com/embed/yvP3mSaYzHE" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>'
                        }
                    ]
                },
            ];
        }
    ]);
