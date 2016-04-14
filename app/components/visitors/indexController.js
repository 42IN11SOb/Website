angular
    .module('altairApp')
    .controller('indexCtrl', [
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
	        		title: '‘Straal uit wie je bent’',
	        		text: '<img class="klein" src="/wp-content/uploads/2014/04/unnamed.png" alt="Vrouw met make-up oogschaduw palet aan de rechterkant van haar gezicht, links kwasten om op te maken" width="60%"><p>Er goed uitzien is voor iemand met een visuele beperking niet minder belangrijk. Het benadrukt de sterke kanten van je persoonlijkheid en maakt je oogverblindend mooi. ‘Oogverblindend Mooi’ is een initiatief van Bartiméus en inspireert over jouw kleur en stijl. Met persoonlijke kleuradvies en je persoonlijke kracht werken we aan je PEP: Persoonlijke Effectieve Presentatie!</p><p>We organiseren regelmatig een gezellige PEP- dag waar onze professionele stylist en visagist je een uitgebreid stylingadvies geven. Twijfel je ook wel eens of die ene spijkerbroek wel staat, of over welke kleur jou echt laat stralen? Zet die twijfel aan de kant en trakteer jezelf op een inspirerende dag waarbij je alles leert over jouw eigen stijl en de kleuren die jou laten stralen! </p>'
	        	},
	        	{
	        		title: 'De winnaars van de loterij op de ZieZo beurs zijn:',
	        		text: '<ul><li>Donderdag: Elma Gelens</li><li>Vrijdag: Anna Kruithof</li><li>Zaterdag: Shirley Maasland</li></ul><p>Gefeliciteerd! Veel plezier op de PEP dag.</p>'
	        	},
	        	{
	        		title: 'Uiterlijk is niet belangrijk?',
	        		text: '<p>‘Hé ik zie dat je bent opgemaakt, staat je goed. Kun je dat nog wel zelf? En zie je dan ook het resultaat?’</p><p>Dit is een vraag die Karin vaak heeft gehoord. Ben je benieuwd naar haar verhaal? Je leest het hier.</p><a ui-sref="bartimeus.pepdag" class="md-btn md-btn-small md-btn-primary">lees meer</a>'
	        	},
        	];
        }
    ]);