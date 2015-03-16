antennas.component.UrlList = React.createClass({
  render: function () {

    var createItem = function (item) {
      return (
        <li className="table-view-cell">
          {item.title}
          <p>{item.url}</p>
          <button className="btn btn-negative" data-url={item.url}>Delete</button>
        </li>
      );
    };

    return <ul className="table-view">{this.props.items.map(createItem)}</ul>;
  }
});
