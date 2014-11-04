define([
    'app',
    'marionette',
    'hbars!../templates/item'
], function(App, Marionette, itemViewTemplate) {
    return Marionette.ItemView.extend({
        tagName: 'li',
        template: itemViewTemplate,
        ui: {
            deleteBtn: '.list-contact__delete'
        },
        triggers: {
            'click @ui.deleteBtn': 'delete'
        }
    });
});
