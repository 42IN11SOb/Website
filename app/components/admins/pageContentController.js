angular
    .module('altairApp')
    .controller('pageContentCtrl', [
        '$scope',
        'pageContent',
        'apiBartimeus',
        '$stateParams',
        '$state',
        function ($scope, pageContent, apiBartimeus, $stateParams, $state) {
            $scope.tinymce_content = convertToHtml(pageContent);
            
            // HTML after convert
            var retContent;
            //JSON object after convert
            var retArray;

            //convert db return into webpage
            function convertToHtml(content) {
                retContent = "<div>";

                for (var i in content) {
                    retContent +="&nbsp;";
                    retContent += "<div class='md-card' id='item'>";
                    if(content[i].subTitle)
                        retContent += "<div class='md-card-toolbar'> <h1 class='md-card-toolbar-heading-text large-heading' id='title'>" + content[i].title + " <small id='subtitle'>" + content[i].subTitle + "</small></h1></div>";
                    else
                        retContent += "<div class='md-card-toolbar'> <h1 class='md-card-toolbar-heading-text large-heading' id='title'>" + content[i].title + "</h1></div>";
                    retContent += "<div class='md-card-content' id='text'>" + content[i].text + "</div>";

                    if (content[i].subItems) {
                        retContent += "<div class='md-card-content'>";
                        for (var j in content[i].subItems) {
                            retContent += "&nbsp;";
                            retContent += "<div id='subitem' class='md-card subitem'>";
                            retContent += "<div class='md-card-toolbar subitem'> <h3 class='md-card-toolbar-heading-text subitem' id='subitemTitle'>" + content[i].subItems[j].title + "</h3></div>";
                            retContent += "<div class='md-card-content subitem' id='subitemText'>" + content[i].subItems[j].text + "</div>";
                            retContent += "</div>";
                            retContent += "&nbsp;";
                        }
                        retContent += "</div>";
                    }
                    retContent += "</div>";
                    retContent += "&nbsp;";
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

                    if (title && text) {
                        tempJson.title = title;
                        if (subTitle) tempJson.subTitle = subTitle;
                        tempJson.text = text;

                        //for each subitem in panel
                        for (var j = 0; j < subItems.length; j++) {
                            var tempSub = {};

                            //subitem title and subitem text strings
                            var subitemTitle = $(subItems[j]).find('#subitemTitle').html();
                            var subitemText = $(subItems[j]).find('#subitemText').html();

                            tempSub.title = subitemTitle;
                            tempSub.text = subitemText;

                            tempSubs.push(tempSub);
                        }
                        if (tempSubs.length > 0) tempJson.subItems = tempSubs;
                        retArray.push(tempJson);
                    }
                }
                console.log(retArray);
                apiBartimeus.setContent($stateParams.name, retArray);
            }

            function splitTitle(title) {
                if (title) {
                    var retString = '';
                    var titleString = title.innerHTML;
                    var splittet = titleString.split(' <small');

                    if (splittet.length)
                        retString = splittet[0];
                    else
                        retString = titleString;

                    return retString;
                } else return null;
            }

            $scope.saveContent = function(){
                convertToJson($scope.tinymce_content);
                $state.go('admin.pages');
            }
                
            $scope.tinymce_options = {
                skin_url: 'assets/skins/tinymce/material_design',
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table contextmenu paste"
                ],
                height: 600,
                //todo get rid of the dropdowns?
                menubar: false, //enable again if missing components
                toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | mybutton abutton",
                //buttons to add a panel and an heading item (subitem)
                setup: function(editor) {
                    editor.addButton('mybutton', {
                        text: 'Add panel',
                        icon: false,
                        onclick: function() {
                            retContent = "<div class='md-card' id='item'>";
                            retContent += "<div class='md-card-toolbar'><h1 class='md-card-toolbar-heading-text large-heading' id='title'>&nbsp;</h1></div>";
                            retContent += "<div class='md-card-content' id='text'><p>&nbsp;</p></div>";
                            retContent += "</div>&nbsp;";console.log(retContent);
                            editor.insertContent(retContent);
                        }
                    });
                    editor.addButton('abutton', {
                        text: 'Add item',
                        icon: false,
                        onclick: function() {
                            retContent = "<div id='subitem' class='md-card subitem'>";
                            retContent += "<div class='md-card-toolbar subitem'> <h3 class='md-card-toolbar-heading-text subitem' id='subitemTitle'>&nbsp;</h3></div>";
                            retContent += "<div class='md-card-content subitem' id='subitemText'><p>&nbsp;</p></div>";
                            retContent += "</div> &nbsp;";console.log(retContent);
                            editor.insertContent(retContent);
                        }
                    });
                },
                content_css: "assets/css/main.css,assets/css/bartimeus.css" //load our css's to show the page correctly in editor
            }

        }
    ]);