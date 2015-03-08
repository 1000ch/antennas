antennas.view.PaginateView = Backbone.View.extend({
  el: '#paginate',
  skip: 0,
  limit: 20,
  events: {
    'click #prev': 'onPrevClick',
    'click #next': 'onNextClick'
  },
  initialize: function () {
    this.skip = this.collection.size();
  },
  onPrevClick: function (e) {

    if (0 < this.skip) {
      this.skip -= this.collection.size();
    }

    if (this.skip < 0) {
      this.skip = 0;
    }

    this.collection.fetch({
      data: {
        skip: this.skip,
        limit: this.limit
      }
    });
  },
  onNextClick: function (e) {

    if (this.collection.size() % this.limit !== 0) {
      return;
    }

    this.skip += this.collection.size();

    this.collection.fetch({
      data: {
        skip: this.skip,
        limit: this.limit
      }
    });
  }
});
