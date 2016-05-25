angular
    .module('altairApp')
    .controller('pageContentCtrl', [
        '$scope',
        'apiBartimeus',
        '$stateParams',
        '$state',
        function ($scope, apiBartimeus, $stateParams, $state) {
            $scope.page;

            function getPage() {
                apiBartimeus.getItem("pages", $stateParams.name, function(item) {
                    //if(item.success === true) {
                        $scope.page = item;
                        $scope.tinymce_content = $scope.page.content;
                        $scope.$apply();
                    //}
                });
            }

            $scope.saveContent = function(){
                $scope.page.content = $scope.tinymce_content;
                apiBartimeus.updateItem("pages", $scope.page.title, $scope.page);
                $state.go('admin.pages');
            }
            
            $(function() {
                getPage();
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