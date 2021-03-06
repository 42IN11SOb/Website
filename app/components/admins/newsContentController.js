angular
    .module('altairApp')
    .controller('newsContentCtrl', [
        '$scope',
        'apiBartimeus',
        '$stateParams',
        '$state',
        'news_data',
        function ($scope, apiBartimeus, $stateParams, $state,news_data) {
            $scope.news;
            var oldTitle;

            function getNews() {
                apiBartimeus.getItem("news", $stateParams.name, function(item) {
                        $scope.news = item;
                        oldTitle = item.title;
                        $scope.tinymce_content = $scope.news.content;
                });
            }

            $scope.saveContent = function(){
                $scope.news.content = $scope.tinymce_content;
                apiBartimeus.updateItem("news", oldTitle, $scope.news);
                $state.go('admin.news');
            }
            
            $(function() {
                oldTitle = news_data.title;
                $scope.news = news_data;
                $scope.tinymce_content = $scope.news.content;
                //getNews();
            })                

            $scope.tinymce_options = {
                skin_url: 'assets/skins/tinymce/material_design',
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table contextmenu paste"
                ],
                height: 600,
                //todo get rid of the dropdowns?
                menubar: true, //disable again if menubar is unnecessary and confusing
                toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | mybutton abutton",
                //buttons to add a panel and an heading item (subitem)
                setup: function(editor) {
                    editor.addButton('mybutton', {
                        text: 'Add panel',
                        icon: false,
                        onclick: function() {
                            retContent = "<div class='md-card'>";
                            retContent += "<div class='md-card-toolbar'><h1 class='md-card-toolbar-heading-text large-heading'>&nbsp;</h1></div>";
                            retContent += "<div class='md-card-content'><p>&nbsp;</p></div>";
                            retContent += "</div>&nbsp;";console.log(retContent);
                            editor.insertContent(retContent);
                        }
                    });
                    editor.addButton('abutton', {
                        text: 'Add item',
                        icon: false,
                        onclick: function() {
                            retContent = "<div class='md-card subitem'>";
                            retContent += "<div class='md-card-toolbar subitem'> <h3 class='md-card-toolbar-heading-text subitem'>&nbsp;</h3></div>";
                            retContent += "<div class='md-card-content subitem'><p>&nbsp;</p></div>";
                            retContent += "</div> &nbsp;";console.log(retContent);
                            editor.insertContent(retContent);
                        }
                    });
                },
                content_css: "assets/css/main.css,assets/css/bartimeus.css" //load our css's to show the page correctly in editor
            }

        }
    ]);