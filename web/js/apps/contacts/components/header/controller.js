define([
    'app',
    'marionette',
    '../../entities/store',
    './views/item',
    './entities/model'
], function(app, Marionette, Store, View, ViewModel) {
    return Marionette.Controller.extend({
        initialize: function() {
            var collection;
            var viewModel;

            collection = Store.collection;

            viewModel = new ViewModel({
                length: collection.length
            });

            this._view = new View({
                model: viewModel
            });

            this._view.listenTo(collection, 'all', function() {
                viewModel.set('length', collection.length);
            });
        },
        getView: function() {
            return this._view;
        }
    });
});
