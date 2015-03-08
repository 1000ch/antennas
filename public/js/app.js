var ItemList = React.createClass({
  render: function () {
    return React.createElement('ul', {
      id: 'items'
    }, this.props.items.map(function(item) {
      return React.createElement('li', null,
        React.createElement('a', {href: item.link}, item.title),
        React.createElement('span', null, item.meta.title),
        React.createElement('time', null, item.pubdate)
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
      document.querySelector('#container')
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

    var $items = $('#items').find('li');
    if ($items.length % 20 === 0) {
      skip += 20;
      fetchItems(skip);
    }
  });

  fetchItems(skip);
});
