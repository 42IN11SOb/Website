angular
    .module('altairApp')
    .controller('pageContentCtrl', [
        '$scope',
        'pageContent',
        'apiBartimeus',
        '$stateParams',
        function ($scope, pageContent, apiBartimeus, $stateParams) {
            // HTML after convert
            var retContent;
            //JSON object after convert
            var retArray;

            //convert db return into webpage
            function convertToHtml(content) {
                retContent = "<div>";

                for (var i in content) {
                    retContent += "<div class='md-card' id='item'>";
                    if(content[i].subTitle)
                        retContent += "<div class='md-card-toolbar'> <h1 class='md-card-toolbar-heading-text large-heading' id='title'>" + content[i].title + " <small id='subtitle'>" + content[i].subTitle + "</small></h1></div>";
                    else
                        retContent += "<div class='md-card-toolbar'> <h1 class='md-card-toolbar-heading-text large-heading' id='title'>" + content[i].title + "</h1></div>";
                    retContent += "<div class='md-card-content' id='text'>" + content[i].text + "</div>";

                    if (content[i].subItems) {
                        retContent += "<div class='md-card-content'>";
                        for (var j in content[i].subItems) {
                            retContent += "<div id='subitem' class='md-card subitem'>";
                            retContent += "<div class='md-card-toolbar subitem'> <h3 class='md-card-toolbar-heading-text subitem' id='subitemTitle'>" + content[i].subItems[j].title + "</h3></div>";
                            retContent += "<div class='md-card-content subitem' id='subitemText'>" + content[i].subItems[j].text + "</div>";
                            retContent += "</div>"
                        }
                        retContent += "</div>";
                    }
                    retContent += "</div>";
                }
                retContent += "</div>";

                return retContent;
            }

            //convert webpage into db setup (json object)
            function convertToJson(content) {
                retArray = [];

                //each item
                var items = $(content).find('#item');

                //foreach item (panel)
                for (var i = 0; i < items.length; i++) {
                    //temp json object for each item
                    var tempJson = {};
                    var tempSubs = [];

                    //subitems
                    var subItems = $(items[i]).find('#subitem');

                    // title, subtitle and text string
                    var title = splitTitle($(items[i]).find('#title')[0]);
                    var subTitle = $(items[i]).find('#subtitle').html();
                    var text = $(items[i]).find('#text').html();

                    tempJson.title = title;
                    if (subTitle) tempJson.subTitle = subTitle;
                    tempJson.text = text;

                    //for each subitem in panel
                    for (var j = 0; j < subItems.length; j++) {
                        var tempSub = {};

                        //subitem title and subitem text strings
                        var subitemTitle = $(subItems[i]).find('#subitemTitle');
                        var subitemText = $(subItems[i]).find('#subitemText');

                        tempSub.title = subitemTitle;
                        tempSub.tecxt = subitemText;

                        tempSubs.push(tempSub);
                    }
                    if(tempSubs.length > 0) tempJson.subItems = tempSubs;
                    retArray.push(tempJson);
                }
                console.log(retArray);
                apiBartimeus.setContent($stateParams.name, retArray);
            }

            function splitTitle(title){
                var retString = '';
                var titleString = title.innerHTML;
                var splittet = titleString.split(' <small');

                if(splittet.length)
                    retString = splittet[0];
                else
                    retString = titleString;

                return retString;
            }

            $scope.saveContent = function(){
                convertToJson($scope.tinymce_content);
            }

            $scope.tinymce_content = convertToHtml(pageContent);
                
            $scope.tinymce_options = {
                skin_url: 'assets/skins/tinymce/material_design',
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table contextmenu paste"
                ],
                //todo get rid of the dropdowns?
                toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                content_css: "assets/css/main.css,assets/css/bartimeus.css" //load our css's to show the page correctly in editor
            }

        }
    ]);