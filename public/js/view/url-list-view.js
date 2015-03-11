"use strict";

antennas.component.UrlList = React.createClass({
  render: function () {
    return React.createElement('ul', {className: 'table-view'}, this.props.items.map(function(item) {
      return React.createElement('li', {className: 'table-view-cell'},
        item.title,
        React.createElement('p', null, item.url),
        React.createElement('button', {'data-url': item.url, className: 'btn btn-negative'}, 'Delete')
      );
    }));
  }
});

antennas.view.UrlListView = Backbone.View.extend({
  el: '#url-list',
  events: {
    'click button': 'onDeleteClick'
  },
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
  },
  onDeleteClick: function (e) {
    this.collection.where({
      url: $(e.target).attr('data-url')
    }).forEach(function (model) {
      model.destroy();
    });
  }
});
