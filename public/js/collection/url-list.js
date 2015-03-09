antennas.collection.UrlList = Backbone.Collection.extend({
  model: antennas.model.Url,
  url: '/api/urls'
});
