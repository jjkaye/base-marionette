define([
    'app',
    'apps/example/show/example_show_controller'
], function(App, Controller) {
    App.module('ExampleApp', function(ExampleApp, App, Backbone, Marionette, $, _) {
        var API;

        ExampleApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                '': 'show'
            }
        });

        API = {
            show: function() {
                new ExampleApp.Show.Controller();

                // Notify application
                App.trigger('example:show');
            }
        };

        App.addInitializer(function() {
            new ExampleApp.Router({
                controller: API
            });
        });

        App.commands.setHandler('example:show', function() {
            App.navigate('');

            API.show();
        });
    });

    return App.ExampleApp;
});
