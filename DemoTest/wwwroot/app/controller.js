(function () {
    'use strict';

    angular
        .module('testApp')
        .controller('testController', testController);

    testController.$inject = ['$http', '$scope', '$routeParams'];

    function testController($http, $scope, $routeParams) {

        $scope.loadData = function () {
            $http({
                method: 'GET',
                url: 'api/Product/'
            }).then(function successCallback(response) {
                $scope.ProductList = response.data;
            }, function errorCallback(response) {
                console.log(response);
            });
        };

        $scope.loadData();
        
        $scope.searchString = "";

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
        console.log(id);

        $scope.getDetail = function () {
            console.log('Hello world!');

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
            console.log("CREATE FUNCTION");
            $http({
                method: 'POST',
                url: 'api/Product/add',
                data: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(function successCallback(response) {
                alert("Create new product successfully?");
                document.getElementById('editForm').reset();

            }, function errorCallback(response) {
                alert("Create new product failed?");

            });
        }

    }
})();

   
