'use strict';

var monk = require('monk');

const dbname   = 'rss';
const mongoUrl = process.env.MONGOLAB_URI ||
                 `mongodb://127.0.0.1:27017/${dbname}`;

class Database {
  constructor() {
    this.db = monk(mongoUrl);
  }
  collection(name) {
    return this.db.get(name);
  }
}

module.exports = Database;
