/*global angular */
angular.module('contactsApp')
    .controller('HeaderController', ['ContactsStore', '$log', function(ContactsStore, $log) {
        var self;
        self = this;
        self.contacts = [];
        ContactsStore.query().then(function(contacts) {
            self.contacts = contacts;
        }, function(error) {
            $log.log(error);
        });
    }])
;
