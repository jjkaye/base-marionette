define([
    // Basic dependencies
    'app',
    'marionette',
    './views/layout',
    // Components
    './components/list/controller',
    './components/header/controller'
], function(app, Marionette, LayoutView,
    ContactsListController, HeaderController) {

    return Marionette.Controller.extend({
        initialize: function() {
            this.layoutView = new LayoutView();
            this.layoutView.on('show', function() {
                this._showContactListComponent();
                this._showHeaderComponent();
            }, this);
        },
        _showContactListComponent: function() {
            if (this.contactListController) {
                this.contactListController.destroy();
            }

            this.contactListController = new ContactsListController();
            this.layoutView.listRegion.show(this.contactListController.getView());
        },
        _showHeaderComponent: function() {
            if (this.headerController) {
                this.headerController.destroy();
            }

            this.headerController = new HeaderController();
            this.layoutView.headerRegion.show(this.headerController.getView());
        },
        getView: function() {
            return this.layoutView;
        }
    });
});
