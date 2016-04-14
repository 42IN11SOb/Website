angular
    .module('altairApp')
    .controller('verhalenCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$sce',
        function ($rootScope,$scope,$timeout,$sce) {
            $scope.toTrustedHTML = function(html) {
                return $sce.trustAsHtml(html);
            };

            $scope.items = [
                {
                    title: 'Ervaringsverhalen',
                    text: 'Deelnemers van verschillende Pep-dagen hebben in onderstaande video vragen beantwoord over de dagen.<p><iframe src="//www.youtube.com/embed/nRUx7HqVmdI" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>'
                },
                {
                    title: 'Annet (44) blind',
                    text: '<h3>‘Ik durf me weer te laten zien’</h3><p>Mijn ‘oude ik’ uit de tijd dat ik nog goed kon zien is is weer naar boven gekomen. Na de PEP-dag straalde ik van oor tot oor en ik wilde opnieuw gezien worden. Mijn zelfvertrouwen heb ik terug gekregen. Kleding en make-up is weer belangrijker voor me geworden.&nbsp; Het heeft me een nieuwe baan opgeleverd die ik daarvoor waarschijnlijk niet had aangenomen. In mijn vertrouwde winkel durven verkopers mij meer afwisselende kledingstukken te adviseren. De kleurenkaart en de adviezen van de stylist komen dan goed van pas. Mensen in mijn omgeving zijn verbaasd over de manier waarop ik me nu kleed of opmaak. Ik heb mijn stijl weer teruggevonden!”</p>'
                },
                {
                    title: 'Dorry (60) slechtziend',
                    text: '<h2>Dorry (60) slechtziend</h2><p>“Uiterlijke verzorging vond ik altijd belangrijk. Eerst ging dit vooral om kleding en sieraden maar later hoorde make-up daar ook bij. Wel was ik er héél voorzichtig mee, want het kon gemakkelijk fout gaan en dat zou mijn slechtziendheid alleen maar accentueren. De PEP-dag van Bartiméus kwam als een verrassing! Samen met andere slechtziende vrouwen ga je op zoek naar de stijl- en kleurcombinaties die het beste bij jou passen. De visagiste liet me ervaren hoe je met enkele handigheidjes zelf goede make-up kunt aanbrengen. De respectvolle benadering was zeer fijn. Daardoor was de sfeer relaxed en de interactie in de groep levendig en motiverend.”</p>'
                },
                {
                    title: 'Laura (33) blind',
                    text: '<h3>‘Mooi zijn doe je voor jezelf!’</h3><p>“Soms heb ik het idee dat we onze visuele beperking moeten compenseren met pittige kleding en make-up. Het algemene beeld dat er bestaat over dat je maar beter gemakkelijke kleding kunt dragen als je toch niets ziet is onzin. Wij mogen ook mooi zijn en er leuk uitzien! Dat doe je in de eerste plaats voor jezelf. Soms is het lastig om te bedenken hoe je jouw mooie kanten kunt benadrukken. Op deze dag leer je hoe je dat doet. Er was persoonlijke aandacht voor de doelgroep en dat is vind ik echt belangrijk.’’</p>'
                },
            ];
        }
    ]);