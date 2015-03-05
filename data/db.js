var monk = require('monk');

const dbname = 'rss';

class Database {
  constructor() {
    this.db = monk(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/${dbname}');
  }
}

module.exports = Database;
