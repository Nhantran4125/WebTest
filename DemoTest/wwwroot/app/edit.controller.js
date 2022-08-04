(function () {
    'use strict';

    angular
        .module('testApp')
        .controller('editController', editController);

    editController.$inject = ['$location', '$http', '$scope', '$routeParams'];

    function editController($location, $http, $scope, $routeParams) {
        var id = $routeParams.id;
        $scope.isEditForm = true;

        $http({
            method: 'GET',
            url: 'api/Product/detail/' + $routeParams.id

        }).then(function successCallback(response) {
            $scope.selectedProduct = response.data;
            console.log($scope.selectedProduct);           

        }, function errorCallback(response) {
            console.log(response);
        });

        $scope.updateProduct = function (item) {
            var isConfirmed = confirm("Are you sure to update this product?");
            if (isConfirmed) {
                item.file = $scope.file;

                var formData = new FormData();
                formData.append('id', item.id);
                formData.append('name', item.name);
                formData.append('price', item.price);
                formData.append('description', item.description);
                
                formData.append('file', item.file);

                $http({
                    method: 'POST',
                    url: 'api/Product/update',
                    data: formData,
                    enctype: 'multipart/form-data',
                    headers: {
                        'Content-Type': undefined
                    }
    
                }).then(function successCallback(response) {
                    console.log(response);
                    window.location.href = '/';
                }, function errorCallback(response) {
                    console.log(response);
                });
            }
            
        }
        
    }
})();
