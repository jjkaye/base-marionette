define([
    'app',
    'marionette',
    '../../entities/store',
    './views/collection',
    './entities/collection'
], function(app, Marionette, Store, CollectionView, ViewCollection) {
    var collectionView;

    return Marionette.Controller.extend({
        initialize: function() {
            var collection;
            var viewCollection;

            collection = Store.collection;
            collection.fetch();

            viewCollection = new ViewCollection(collection.models, {
                source_collection: collection // jshint ignore:line
            });

            collectionView = new CollectionView({
                collection: viewCollection
            });

            collectionView.on('childview:delete', function(view) {
                view.model.get('source_model').destroy();
            }, this);
        },
        getView: function() {
            return collectionView;
        }
    });
});
