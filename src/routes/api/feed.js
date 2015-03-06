'use strict';

const FeedReader = require('../../data/feed-reader');
const Database   = require('../../data/database');

function get(req, res) {

  let database = new Database();
  let reader = new FeedReader([
    'http://feeds.pinboard.in/rss/u:hiloki/'
  ]);

  Promise.all(reader.get()).then(function (array) {
    array.forEach((item) => database.insert(item));
    console.log(array);
    res.json(array);
  });
}

module.exports = get;
