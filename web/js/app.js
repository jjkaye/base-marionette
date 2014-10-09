/*global define */
define([
    'marionette',
    'backbone',
    'underscore',
    'data/data',
    'Handlebars'
], function(Marionette, Backbone, _, data, Handlebars) {
    // Start up a new Marionette Application
    var App = new Marionette.Application();

    // Add regions
    App.addRegions({
        exampleRegion: '.example-region'
    });

    // Fires after the Application has started and after the initializers
    // have been executed.
    App.on('start', function() {
        // Load all modules with routers
        require([
            // Example app
            'apps/example/example_app'
        ], function() {
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

    // Initializer callback. Fires when the application has started.
    App.addInitializer(function(options) {
        // Remove 300ms delay on mobile clicks.
        require(['fastclick'], function(fastClick) {
            fastClick.attach(document.body);
        });
    });

    // Allow logging in handlebar templates
    // ex: {{ log this }}
    Handlebars.registerHelper('log', function(context) {
        return window.console.log(context);
    });

    // Returning data/data.js when requested
    App.reqres.setHandler('data', function() {
        return data;
    });

    // Return the application instance.
    return App;
});
