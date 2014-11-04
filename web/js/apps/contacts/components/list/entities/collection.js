define([
    'backbone',
    './model',
    // Side effect dependencies
    'backbone-view-model'
], function(Backbone, Model) {
    return Backbone.ViewCollection.extend({
        model: Model
    });
});
