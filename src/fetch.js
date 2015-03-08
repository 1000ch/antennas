'use strict';

const fs         = require('fs');
const Database   = require('./database');
const FeedLoader = require('./feedloader');

let list     = JSON.parse(fs.readFileSync('config.json'));
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
  }, (error) => {
    console.log(error);
  })

  .then(() => {
    return items.index('link');
  }, (error) => {
    console.log(error);
  }).then(() => {

    console.log(`${array.length} links fetched...`);
    console.log(`${filtered.length} links inserted...`);

    process.exit();
  });
});
