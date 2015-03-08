antennas.component.ItemList = React.createClass({
  render: function () {
    return React.createElement('ul', {className: 'table-view'}, this.props.items.map(function(item) {
      return React.createElement('li', {className: 'table-view-cell media'},
        React.createElement('a', {href: item.link},
          React.createElement('div', {className: 'media-body'},
            item.title,
            React.createElement('p', null, item.description),
            React.createElement('p', null, item.meta.title),
            React.createElement('p', null, moment(item.pubdate).format('YYYY/MM/DD HH:mm'))
          )
        )
      );
    }));
  }
});

antennas.view.ItemListView = Backbone.View.extend({
  el: '#list',
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
