define([
    'app',
    'marionette',
    'hbars!../templates/empty'
], function(App, Marionette, itemViewTemplate) {
    return Marionette.ItemView.extend({
        tagName: 'li',
        template: itemViewTemplate
    });
});
