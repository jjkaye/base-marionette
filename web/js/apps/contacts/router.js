define([
    './controller',
    'marionette.viewrouter'
], function(ContactsController, ViewRouter) {
    return ViewRouter.extend({
        routes: {
            '': 'contacts'
        },
        contacts: function() {
            var controller;

            controller = new ContactsController();
            return controller.getView();
        }
    });
});
