"use strict";

antennas.view.AddUrlView = Backbone.View.extend({
  el: '#addurl',
  events: {
    'submit form': 'onSubmit'
  },
  onSubmit: function (e) {

    var title = this.$el.find('#rss-title').val();
    var url = this.$el.find('#rss-url').val();

    var model = new antennas.model.Url({
      title: title,
      url: url
    });

    this.collection.create(model, {
      validate: true
    });
  }
});
