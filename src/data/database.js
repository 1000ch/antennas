'use strict';

const monk = require('monk');

const dbname   = 'antennas';
const hostname = process.env.MONGOLAB_URI || `mongodb://127.0.0.1:27017/${dbname}`;

class Database {
  constructor() {
    this.db = monk(hostname);
  }
  collection(name) {
    return this.db.get(name);
  }
}

module.exports = Database;
