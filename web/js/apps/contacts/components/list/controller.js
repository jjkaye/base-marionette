define([
    'app',
    'marionette',
    '../../entities/store',
    './views/collection',
    './entities/collection'
], function(app, Marionette, Store, CollectionView, ViewCollection) {

    return Marionette.Controller.extend({
        initialize: function() {
            var collection;
            var viewCollection;

            collection = Store.collection;
            collection.fetch();

            viewCollection = new ViewCollection(collection.models, {
                source_collection: collection // jshint ignore:line
            });

            this.collectionView = new CollectionView({
                collection: viewCollection
            });

            this.collectionView.on('childview:delete', function(view) {
                view.model.get('source_model').destroy();
            }, this);
        },
        getView: function() {
            return this.collectionView;
        }
    });
});
