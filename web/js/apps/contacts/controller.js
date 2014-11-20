define([
    // Basic dependencies
    'app',
    'marionette',
    './views/layout',
    // Components
    './components/list/controller',
    './components/header/controller'
], function(app, Marionette, LayoutView,
    ContactsController, HeaderController) {
    var contactListController;
    var headerController;
    var layoutView;

    return Marionette.Controller.extend({
        initialize: function() {
            layoutView = new LayoutView();
            layoutView.on('show', function() {
                this._showContactListComponent();
                this._showHeaderComponent();
            }, this);
        },
        _showContactListComponent: function() {
            if (contactListController) {
                contactListController.destroy();
            }

            contactListController = new ContactsController();
            layoutView.listRegion.show(contactListController.getView());
        },
        _showHeaderComponent: function() {
            if (headerController) {
                headerController.destroy();
            }

            headerController = new HeaderController();
            layoutView.headerRegion.show(headerController.getView());
        },
        getView: function() {
            return layoutView;
        }
    });
});
