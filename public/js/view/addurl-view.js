"use strict";

antennas.view.AddUrlView = Backbone.View.extend({
  el: '#addurl',
  events: {
    'submit form': 'onSubmit'
  },
  onSubmit: function (e) {

    var url = this.$el.find('input').val();

    $.ajax(url).done(function (xml) {
      var model = new antennas.model.Url({
        url: url,
        title: $(xml).find('title').text()
      });
      this.collection.create(model, {
        validate: true
      });
    }).fail(function (error) {
      console.log(error);
    });
  }
});
