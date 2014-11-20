define([
    'app',
    'marionette',
    'hbars!../templates/layout'
], function(App, Marionette, template) {
    return Marionette.LayoutView.extend({
        template: template,
        regions: {
            headerRegion: '.header-region',
            listRegion: '.list-region'
        }
    });
});
