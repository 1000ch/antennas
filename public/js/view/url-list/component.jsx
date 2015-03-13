antennas.component.UrlList = React.createClass({
  render: function () {

    var createItem = function (item) {
      return (
        <li class="table-view-cell">
          {item.title}
          <p>item.url</p>
          <button class="btn btn-negative" data-url="{item.url}">Delete</button>
        </li>
      );
    };

    return <ul class="table-view">{this.props.items.map(createItem)}</ul>;
  }
});
