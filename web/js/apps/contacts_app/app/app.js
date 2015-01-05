/*global angular */
angular.module('contactsApp', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'js/apps/contacts_app/app/contacts/contacts_list/contacts_list.html',
                controller: 'ContactsListController as ctrl'
            })
            .when('/contacts/:id', {
                templateUrl: 'js/apps/contacts_app/app/contacts/contacts_single/contacts_single.html',
                controller: 'ContactsSingleController as ctrl'
            })
            .otherwise({
                redirectTo: '/'
            })
        ;
        $locationProvider.html5Mode(true);
    }])
;
