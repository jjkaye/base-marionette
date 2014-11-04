/*globals requirejs */

(function(undefined) {
    'use strict';

    requirejs.config({
        paths: {
            backbone: '../vendor/backbone/backbone',
            'backbone.babysitter': '../vendor/backbone.babysitter/lib/backbone.babysitter',
            'backbone-view-model': '../vendor/backbone-view-model/src/view-model',
            'backbone.wreqr': '../vendor/backbone.wreqr/lib/backbone.wreqr',
            fastclick: '../vendor/fastclick/lib/fastclick',
            Handlebars: '../vendor/handlebars/handlebars',
            hbars: '../vendor/requirejs-handlebars/hbars',
            jquery: '../vendor/jquery/dist/jquery',
            marionette: '../vendor/backbone.marionette/lib/core/backbone.marionette',
            modernizr: '../vendor/modernizr/modernizr',
            text: '../vendor/requirejs-text/text',
            underscore: '../vendor/underscore/underscore'
        },
        shim: {
            modernizr: {
                exports: 'Modernizr'
            }
        },
        hbars: {
            extension: '.hbs'
        }
    });
    require(['app'], function(App) {
        App.start();
    });
}());
