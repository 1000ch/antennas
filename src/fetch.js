'use strict';

const fs         = require('fs');
const Database   = require('./database');
const FeedLoader = require('./feedloader');

let database = new Database();
let loader   = new FeedLoader();
let db       = {
  urls:  database.collection('urls'),
  items: database.collection('items')
};

db.urls.count({}).then((count) => {

  console.log(`Registered URLs are ${count}`);

  if (count === 0) {
    let defaults = JSON.parse(fs.readFileSync('config.json'));
    return db.urls.insert(defaults).then(() => {
      return db.urls.find({});
    });
  } else {
    return db.urls.find({});
  }

}).then((urls) => {

  console.log(urls.map((item) => {
    return item.url;
  }));

  loader.addUrls(urls.map((item) => {
    return item.url;
  }));

  loader.get().then((items) => {

    let links    = items.map((item) => item.link);
    let filtered = items.filter((item, index) => {
      return links.indexOf(item.link) === index;
    });

    db.items.drop().then(
      () => db.items.insert(filtered),
      (error) => console.log(error)
    ).then(
      () => db.items.index('link'),
      (error) => console.log(error)
    ).then(() => {

      console.log(`${items.length} links fetched...`);
      console.log(`${filtered.length} links inserted...`);

      process.exit();
    }, (error) => {
      console.log(error);
    });
  });

}, (error) => {

  console.log(error);
  process.exit();

});
