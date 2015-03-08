antennas.collection.ItemList = Backbone.Collection.extend({
  model: antennas.model.Item,
  url: '/api/items'
});
