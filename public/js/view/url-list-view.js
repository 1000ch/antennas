antennas.component.UrlList = React.createClass({
  render: function () {
    return React.createElement('ul', {className: 'table-view'}, this.props.items.map(function(item) {
      return React.createElement('li', {className: 'table-view-cell media'},
        React.createElement('a', {href: item.url},
          React.createElement('div', {className: 'media-body'},
            item.title,
            React.createElement('p', null, item.url)
          )
        )
      );
    }));
  }
});

antennas.view.UrlListView = Backbone.View.extend({
  el: '#url-list',
  initialize: function () {
    this.listenTo(this.collection, 'add remove sync', this.render);
  },
  render: function () {
    React.render(
      React.createElement(antennas.component.UrlList, {
        items: this.collection.toJSON()
      }),
      this.$el.get(0)
    );
  }
});
