define([
    // Basic dependencies
    'app',
    'marionette',
    './view',
    // Components
    './components/list/controller',
    './components/header/controller'
], function(app, Marionette, View,
    ContactsController, HeaderController) {
    return Marionette.Controller.extend({
        initialize: function() {
            this._view = new View();
            this._view.on('show', function() {
                this._showContactListComponent();
                this._showHeaderComponent();
            }, this);
        },
        _showContactListComponent: function() {
            var controller;

            controller = new ContactsController();
            this._view.listRegion.show(controller.getView());
        },
        _showHeaderComponent: function() {
            var controller;

            controller = new HeaderController();
            this._view.headerRegion.show(controller.getView());
        },
        getView: function() {
            return this._view;
        }
    });
});
