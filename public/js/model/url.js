"use strict";

antennas.model.Url = Backbone.Model.extend({
  parse: function (item) {
    return {
      id: item._id,
      title: item.title,
      url: item.url
    }
  }
});
