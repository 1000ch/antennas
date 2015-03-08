antennas.collection.itemList = new antennas.collection.ItemList();

antennas.view.itemListView = new antennas.view.ItemListView({
  collection: antennas.collection.itemList
});

antennas.view.paginateView = new antennas.view.PaginateView({
  collection: antennas.collection.itemList
});

antennas.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'login': 'login'
  },
  initialze: function () {
  },
  onRoute: function () {},
  index: function () {
    antennas.collection.itemList.fetch();
  },
  login: function () {
  }
});

$(function () {
  antennas.router = new antennas.Router();
  Backbone.history.start({
    pushState: true
  });
});
