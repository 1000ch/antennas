antennas.collection.itemList = new antennas.collection.ItemList();
antennas.view.itemListView = new antennas.view.ItemListView({
  collection: antennas.collection.itemList
});
antennas.view.paginateView = new antennas.view.PaginateView({
  collection: antennas.collection.itemList
});

$(function () {
  antennas.collection.itemList.fetch();
});
