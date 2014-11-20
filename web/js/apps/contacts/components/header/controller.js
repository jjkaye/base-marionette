define([
    'app',
    'marionette',
    '../../entities/store',
    './views/item',
    './entities/model'
], function(app, Marionette, Store, ItemView, ViewModel) {
    var itemView;

    return Marionette.Controller.extend({
        initialize: function() {
            var collection;
            var viewModel;

            collection = Store.collection;

            viewModel = new ViewModel({
                length: collection.length
            });

            itemView = new ItemView({
                model: viewModel
            });

            itemView.listenTo(collection, 'all', function() {
                viewModel.set('length', collection.length);
            });
        },
        getView: function() {
            return itemView;
        }
    });
});
