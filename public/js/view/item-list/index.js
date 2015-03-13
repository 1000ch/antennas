antennas.view.ItemListView = Backbone.View.extend({
  el: '#item-list',
  initialize: function () {
    this.listenTo(this.collection, 'add remove sync', this.render);
  },
  render: function () {
    React.render(
      React.createElement(antennas.component.ItemList, {
        items: this.collection.toJSON()
      }),
      this.$el.get(0)
    );
  }
});
