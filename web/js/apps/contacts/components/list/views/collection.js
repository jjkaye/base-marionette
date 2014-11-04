define([
    'app',
    'marionette',
    './item',
    './empty'
], function(App, Marionette, ItemView, EmptyView) {
    return Marionette.CollectionView.extend({
        tagName: 'ul',
        childView: ItemView,
        emptyView: EmptyView
    });
});
