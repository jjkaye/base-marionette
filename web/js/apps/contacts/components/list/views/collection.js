define([
    'app',
    'marionette',
    './item',
    './empty'
], function(App, Marionette, ItemView, EmptyView) {
    return Marionette.CollectionView.extend({
        className: 'contacts-list',
        tagName: 'ul',
        childView: ItemView,
        emptyView: EmptyView
    });
});
