/*global angular */
angular.module('contactsApp', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                template: '<div>Hello World</div>'
            })
        ;
        $locationProvider.html5Mode(true);
    }])
;
