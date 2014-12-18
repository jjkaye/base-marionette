/*global define */
define([
    'marionette',
    'backbone',
    'underscore',
    'Handlebars',
    // Side effects
    'extensions/marionette_memory_safe_controller',
    'extensions/facebook',
    'marionette.googleAnalyticsEvents',
    'modernizr'
], function(Marionette, Backbone, _, Handlebars) {
    // Start up a new Marionette Application
    var App = new Marionette.Application();

    // Add regions
    App.addRegions({
        appRegion: '#app'
    });

    // Fires after the Application has started and after the initializers
    // have been executed.
    App.on('start', function() {
        // Load all modules with routers
        require([
            // Example app
            'apps/contacts/router'
        ], function(ContactsRouter) {
            new ContactsRouter({
                region: App.appRegion
            });

            // Start the history. All modules with routing must be loaded in the
            // above require call.
            if (Backbone.history) {
                Backbone.history.start({
                    pushState: true
                });
            }
        });
    });

    // Wrapper for `Backbone.history.navigate`.
    App.navigate = function(route,  options) {
        Backbone.history.navigate(route, options);
    };

    // Wrapper for `Backbone.history.fragment`.
    App.getCurrentRoute = function() {
        return Backbone.history.fragment;
    };

    // Allow logging in handlebar templates
    // ex: {{ log this }}
    Handlebars.registerHelper('log', function(context) {
        return window.console.log(context);
    });

    // Return the application instance.
    return App;
});
