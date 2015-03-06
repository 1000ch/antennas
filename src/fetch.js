'use strict';

const Database   = require('./data/database');
const FeedLoader = require('./data/feedloader');

const list = [
  'http://feeds.pinboard.in/rss/u:studiomohawk/',
  'http://feeds.pinboard.in/rss/u:rem/',
  'http://feeds.pinboard.in/rss/u:pocotan001/'
];

let database = new Database();
let loader   = new FeedLoader(list);
let items    = database.collection('items');

loader.get().then((array) => {

  let links    = array.map((item) => item.link);
  let filtered = array.filter((item, index) => {
    return links.indexOf(item.link) === index;
  });

  items.drop().then(() => {
    return items.insert(filtered);
  }).then(() => {
    return items.index('link');
  }).then(() => {
    process.exit();
  });
});
