define([
    'app',
    'marionette',
    'hbars!../templates/item'
], function(App, Marionette, itemViewTemplate) {
    return Marionette.ItemView.extend({
        template: itemViewTemplate,
        modelEvents: {
            'change:length': 'render'
        }
    });
});
