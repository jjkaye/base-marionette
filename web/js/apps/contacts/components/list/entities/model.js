define([
    'backbone',

    // Side effect dependencies
    'backbone-view-model'
], function(Backbone) {
    return Backbone.ViewModel.extend({
        computed_attributes: { // jshint ignore:line
            id: function() {
                return this.get('source_model').get('id');
            },
            first_name: function() { // jshint ignore:line
                return this.get('source_model').get('first_name');
            },
            last_name: function() { // jshint ignore:line
                return this.get('source_model').get('last_name');
            },
            avatar: function() {
                return this.get('source_model').get('avatar');
            }
        }
    });
});
