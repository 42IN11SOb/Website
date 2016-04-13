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
	        		text: ''
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