/*global angular */
angular.module('contactsApp', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'js/apps/contacts/app/contacts_list/contacts_list.html',
                controller: 'ContactsListCtrl as ctrl'
            })
            .when('/contacts/:id', {
                templateUrl: 'js/apps/contacts/app/contacts_single/contacts_single.html',
                controller: 'ContactsSingleCtrl as ctrl'
            })
            .otherwise({
                redirectTo: '/'
            })
        ;
        $locationProvider.html5Mode(true);
    }])
;
