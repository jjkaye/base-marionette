/*global angular */
angular.module('contactsApp')
    .controller('ContactsListCtrl', ['ContactsStore', '$log', '$filter', '$window', function(ContactsStore, $log, $filter, $window) {
        var self;
        self = this;
        self.contacts = [];
        ContactsStore.query().then(function(contacts) {
            self.contacts = contacts;
        }, function(error) {
            $log.log(error);
        });
        // jshint ignore:start
        // `delete` is a reserved word.
        // `first_name` and `last_name` are not camel case.
        self.delete = function(contact) {
            var confirm;
            confirm = $window.confirm('Are you sure you want to delete ' + contact.first_name + ' ' + contact.last_name + '?');
            if (confirm) {
                ContactsStore.delete(contact);
            }
        };
        // jshint ignore:end
    }])
;
