"use strict";

antennas.collection.itemList = new antennas.collection.ItemList();
antennas.collection.urlList = new antennas.collection.UrlList();

antennas.view.itemListView = new antennas.view.ItemListView({
  collection: antennas.collection.itemList
});

antennas.view.urlListView = new antennas.view.UrlListView({
  collection: antennas.collection.urlList
});

antennas.view.paginateView = new antennas.view.PaginateView({
  collection: antennas.collection.itemList
});

antennas.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'login': 'login',
    'setting': 'setting'
  },
  initialze: function () {
  },
  onRoute: function () {},
  index: function () {
    antennas.collection.itemList.fetch();
  },
  login: function () {
  },
  setting: function () {
    antennas.collection.urlList.fetch();
  }
});

$(function () {
  antennas.router = new antennas.Router();
  Backbone.history.start({
    pushState: true
  });
});
