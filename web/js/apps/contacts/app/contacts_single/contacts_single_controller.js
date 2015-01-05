/*global angular */
angular.module('contactsApp')
    .controller('ContactsSingleController', ['ContactsStore', '$routeParams', '$location', function(ContactsStore, $routeParams, $location) {
        var self;
        self = this;
        ContactsStore.contactDetails($routeParams.id).then(function(response) {
            self.contact = response.data.data;

        });
        self.updateContact = function() {
            ContactsStore.update(self.contact).then(function() {
                $location.url('/');
            });
        };
    }])
;
