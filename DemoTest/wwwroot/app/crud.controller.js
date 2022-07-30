(function () {
    'use strict';

    angular
        .module('testApp')
        .controller('crudController', crudController);

    crudController.$inject = ['$location', '$http', '$scope', '$routeParams'];

    function crudController($location, $http, $scope, $routeParams) {
        var id = $routeParams.id;
        console.log(id);

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

        $scope.updateProduct = function (item) {
            var isConfirmed = confirm("Are you sure to update this product?");
            if (isConfirmed) {
                $http({
                    method: 'POST',
                    url: 'api/Product/update',
                    data: JSON.stringify(item),
                    headers: {
                        'Content-Type': 'application/json'
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
