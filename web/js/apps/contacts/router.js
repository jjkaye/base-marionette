define([
    './controller',
    'marionette.viewrouter'
], function(Controller, ViewRouter) {
    var controller;

    return ViewRouter.extend({
        routes: {
            '': 'contacts'
        },
        contacts: function() {
            if (controller) {
                controller.destroy();
            }

            controller = new Controller();
            return controller.getView();
        }
    });
});
