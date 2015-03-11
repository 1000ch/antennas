"use strict";

const Parser   = require('feedparser');
const Promise  = require('promise');
const request  = require('request');
const validUrl = require('valid-url');

class FeedLoader {

  constructor(urls = []) {
    this.urls = urls.filter((url) => validUrl.isUri(url));
  }

  addUrl(url = '') {
    if (!validUrl.isUri(url)) {
      return;
    }
    this.urls.push(url);
  }

  addUrls(urls = []) {
    urls.filter((url) => {
      return validUrl.isUri(url);
    }).forEach((url) => {
      this.urls.push(url);
    });
  }

  get() {

    return new Promise((resolve, reject) => {

      let promises = [];
      let array = [];

      this.urls.forEach((url) => {

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
                description: item.description || '',
                pubdate: item.pubdate || item.pubDate || '',
                link: item.link,
                meta: {
                  title: item.meta.title,
                  description: item.meta.description,
                  link: item.meta.link
                }
              });
            }
          });

          parser.on('end', function () {
            resolve();
          });
        });

        promises.push(promise);
      });

      Promise.all(promises).then(function () {
        resolve(array);
      }, reject);
    });
  }
}

module.exports = FeedLoader;
