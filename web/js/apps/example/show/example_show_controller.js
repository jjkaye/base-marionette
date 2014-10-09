define([
    'app',
    'apps/example/show/example_show_view'
], function(App, View) {
    App.module('ExampleApp.Show', function(ExampleApp, App, Backbone, Marionette, $, _) {

        ExampleApp.Controller = Marionette.Controller.extend({
            initialize: function() {
                this.layout = new View.Layout();

                this.listenTo(this.layout, 'show', this.showItemView);

                App.exampleRegion.show(this.layout);
            },

            showItemView: function() {
                var view = new View.Item();

                this.layout.bodyRegion.show(view);
            }
        });
    });

    return App.ExampleApp.Show.Controller;
});
