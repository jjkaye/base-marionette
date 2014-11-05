define([
    'app',
    'marionette',
    '../../entities/store',
    './views/collection',
    './entities/collection'
], function(app, Marionette, Store, View, ViewCollection) {
    return Marionette.Controller.extend({
        initialize: function() {
            var collection;
            var viewCollection;

            collection = Store.collection;
            collection.fetch();

            viewCollection = new ViewCollection(collection.models, {
                source_collection: collection // jshint ignore:line
            });

            this._view = new View({
                collection: viewCollection
            });

            this._view.on('childview:delete', function(view) {
                view.model.get('source_model').destroy();
            }, this);
        },
        getView: function() {
            return this._view;
        }
    });
});
