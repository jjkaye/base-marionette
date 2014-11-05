define([
    'backbone'
], function(Backbone) {
    return Backbone.Collection.extend({
        url: 'http://reqr.es/api/users',
        parse: function(response) {
            return response.data;
        }
    });
});
