(function () {
    'use strict';

    angular
        .module('testApp')
        .controller('testController', testController);

    testController.$inject = ['$http', '$scope', '$routeParams', '$q'];

    function testController($http, $scope, $routeParams, $q) {
        $scope.isEditForm = false;
        $scope.searchString = "";

        $scope.loadData = function () {
            $http({
                method: 'GET',
                url: 'api/Product/'
            }).then(function successCallback(response) {
                $scope.ProductList = response.data;               
                console.log($location.path());
                
            }, function errorCallback(response) {
                console.log(response);
            });
        };

        $scope.loadData();
               
        $scope.searchFilter = function (item) {
           
            return item.name.toLowerCase().includes($scope.searchString.toLowerCase())
                || item.description.toLowerCase().includes($scope.searchString.toLowerCase());
        }       

        $scope.delete = function (id) {
            var isConfirmed = confirm("Are you sure to delete this product?");
            if (isConfirmed) {
                $http({
                    method: 'POST',
                    url: 'api/Product/delete/' + id
                }).then(function successCallback(response) {
                    $scope.loadData();
                }, function errorCallback(response) {
                    console.log(response);
                });
            }            
        }

        var id = $routeParams.id;       

        $scope.getDetail = function () {           
            $http({
                method: 'GET',
                url: 'api/Product/detail/' + $routeParams.id
            }).then(function successCallback(response) {
                $scope.selectedProduct = response.data;
                console.log($scope.selectedProduct);
                
            }, function errorCallback(response) {
                console.log(response);
            });
        }

        $scope.addProduct = function (item) {            
            item.file = $scope.file;
            var formData = new FormData();
            formData.append('id', item.id);
            formData.append('name', item.name);
            formData.append('price', item.price);
            formData.append('description', item.description);
            formData.append('file', item.file);

            $http({
                method: 'POST',
                url: 'api/Product/add',
                data: formData,
                enctype: 'multipart/form-data',
                headers: {
                    'Content-Type': undefined
                }

            }).then(function successCallback(response) {
                console.log(response);
                alert("Create new product successfully?");
                document.getElementById('editForm').reset();
                document.getElementById('thumbnailPic').setAttribute('src',null);

            }, function errorCallback(response) {
                console.log(response);
                alert("Create new product failed.");

            });
        }
     
    }
})();



   
