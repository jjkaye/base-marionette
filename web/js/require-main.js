/*globals requirejs */

(function(undefined) {
    'use strict';

    define('ga', function() {
        return window.ga;
    });

    requirejs.config({
        paths: {
            backbone: '../vendor/backbone/backbone',
            'backbone.babysitter': '../vendor/backbone.babysitter/lib/backbone.babysitter',
            'backbone-view-model': '../vendor/backbone-view-model/src/view-model',
            'backbone.wreqr': '../vendor/backbone.wreqr/lib/backbone.wreqr',
            facebook: '../vendor/facebook/index',
            Handlebars: '../vendor/handlebars/handlebars',
            hbars: '../vendor/requirejs-handlebars/hbars',
            jquery: '../vendor/jquery/dist/jquery',
            marionette: '../vendor/backbone.marionette/lib/core/backbone.marionette',
            'marionette.googleAnalyticsEvents': '../vendor/marionette.googleAnalyticsEvents/lib/marionette.googleAnalyticsEvents',
            'marionette.viewrouter': '../vendor/marionette.viewrouter/src/marionette.viewrouter',
            modernizr: '../vendor/modernizr/modernizr',
            text: '../vendor/requirejs-text/text',
            twitter: '../vendor/twitter/index',
            underscore: '../vendor/underscore/underscore'
        },
        shim: {
            facebook: {
                exports: 'FB'
            },
            ga: {
                exports: 'ga'
            },
            modernizr: {
                exports: 'Modernizr'
            }
        },
        hbars: {
            extension: '.hbs'
        },
        waitSeconds: 0
    });
    require(['app'], function(App) {
        App.start();
    });
}());
