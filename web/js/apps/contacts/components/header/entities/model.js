define([
    'backbone',

    // Side effect dependencies
    'backbone-view-model'
], function(Backbone) {
    return Backbone.ViewModel.extend({
        defaults: {
            length: 0
        }
    });
});
