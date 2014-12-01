define([
    'app',
    'marionette',
    '../../entities/store',
    './views/item',
    './entities/model'
], function(app, Marionette, Store, ItemView, ViewModel) {

    return Marionette.Controller.extend({
        initialize: function() {
            var collection;
            var viewModel;

            collection = Store.collection;

            viewModel = new ViewModel({
                length: collection.length
            });

            this.itemView = new ItemView({
                model: viewModel
            });

            this.itemView.listenTo(collection, 'all', function() {
                viewModel.set('length', collection.length);
            });
        },
        getView: function() {
            return this.itemView;
        }
    });
});
