var FeedParser = require('feedparser');
var request = require('request');

var get = function (req, res) {

  var array = [];
  var r = request('http://feeds.pinboard.in/rss/u:hiloki/');
  var feedparser = new FeedParser();

  r.on('error', function (error) {
    console.log(error);
  });

  r.on('response', function (res) {
    var stream = this;

    if (res.statusCode != 200) {
      return this.emit('error', new Error('Bad status code'));
    }

    stream.pipe(feedparser);
  });

  feedparser.on('error', function (error) {
    console.log(error);
  });

  feedparser.on('readable', function() {
    var stream = this;
    var meta = this.meta;
    var item;

    while (item = stream.read()) {
      array.push({
        title: item.title,
        description: item.description,
        link: item.link
      });
    }
  });
  
  feedparser.on('end', function () {
    res.json(array);
  });
};

module.exports = {
  get: get
};