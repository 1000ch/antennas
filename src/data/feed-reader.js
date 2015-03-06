'use strict';

var Parser   = require('feedparser');
var Promise  = require('promise');
var request  = require('request');
var validUrl = require('valid-url');

class FeedReader {

  constructor(urls = []) {
    this.urls = urls.filter((url) => validUrl.isUri(url));
  }

  addUrl(url = '') {
    if (!validUrl.isUri(url)) {
      return;
    }
    this.urls.push(url);
  }

  get() {

    let promises = [];
    this.urls.forEach((url) => {

      let array = [];
      let r = request(url);
      let parser = new Parser();

      let promise = new Promise((resolve, reject) => {

        // if error occured
        r.on('error', reject);
        parser.on('error', reject);

        r.on('response', (response) => {

          // if status code is 200
          if (response.statusCode != 200) {
            return r.emit('error', new Error('Bad status code'));
          }

          r.pipe(parser);
        });

        parser.on('readable', () => {

          let item;
          while (item = parser.read()) {
            array.push({
              title: item.title,
              description: item.description,
              link: item.link
            });
          }
        });

        parser.on('end', function () {
          resolve(array);
        });
      });

      promises.push(promise);
    });

    return promises;
  }
}

module.exports = FeedReader;
