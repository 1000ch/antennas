antennas.component.ItemList = React.createClass({
  render: function () {

    var createItem = function (item) {
      return (
        <li class="table-view-cell media">
          <a href="{item.link}">
            <div class="media-body">
              {item.title}
              <p>{item.description}</p>
              <p>{item.meta.title}</p>
              <p>moment(item.pubdate).format('YYYY/MM/DD HH:mm')</p>
            </div>
          </a>
        </li>
      );
    };

    return <ul class="table-view">{this.props.items.map(createItem)}</ul>;
  }
});
