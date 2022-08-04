(function () {
    'use strict';

    angular
        .module('testApp')
        .directive('fileModel', fileModel);

    fileModel.$inject = ['$window', '$parse'];

    function fileModel($window, $parse) {
        // Usage:
        //     <fileModel></fileModel>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            var model = $parse(attrs.fileModel),
                modelSetter = model.assign; //define a setter for demoFileModel
           
            element.bind('change', function () {              
                scope.$apply(function () {
                    //set the model value
                    modelSetter(scope, element[0].files[0]);
                    console.log(element[0].files[0]);                    
                });

                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    let dataURL = event.target.result;
                    document.getElementById('thumbnailPic').setAttribute('src', `${dataURL}`);
                }
                fileReader.readAsDataURL(element[0].files[0]);

            });
        }
    }

})();