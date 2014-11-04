define([
    './collection'
], function(Collection) {
    var store;

    store = {};
    store.collection = new Collection();

    return store;
});
