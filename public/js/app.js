var ItemList = React.createClass({
  render: function () {
    return React.createElement('ul', {id: 'items', className: 'table-view'}, this.props.items.map(function(item) {
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

function fetchItems(skip, limit) {
  $.ajax({
    url: '/api/rss',
    data: {
      skip: skip,
      limit: limit
    }
  }).done(function (items) {
    React.render(
      React.createElement(ItemList, {
        items: items
      }),
      document.querySelector('.content')
    );
  }).fail(function (error) {
    console.log(error);
  });
}

$(function () {

  var skip = 0;

  $('#prev').on('click', function () {
    if (0 < skip) {
      skip -= 20;
    }
    if (skip < 0) {
      skip = 0;
    }
    fetchItems(skip);
  });

  $('#next').on('click', function () {
    if ($('#items').find('li').length % 20 !== 0) {
      return;
    }
    skip += 20;
    fetchItems(skip);
  });

  fetchItems(skip);
});
