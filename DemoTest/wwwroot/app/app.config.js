angular.
    module('testApp').
    config(
        function config($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'TemplateView/Content.html',
                    controller: 'testController'
                }).
                when('/list', {
                    templateUrl: 'TemplateView/Content.html',
                    controller: 'testController'
                }).
                when('/edit/:id', {
                    templateUrl: 'TemplateView/Detail.html',
                    controller: 'crudController'
                }).
                when('/add', {
                    templateUrl: 'TemplateView/Detail.html',
                    controller: 'testController'
                }).
                otherwise('TemplateView/Content.html');
        }
  );