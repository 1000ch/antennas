'use strict';

const Database   = require('../../data/database');

module.exports = function (request, response) {

  let database = new Database();
  let items    = database.collection('items');

  items.find({}, {
    skip: request.query.skip || 0,
    limit: request.query.limit || 20,
    sort: {
      pubdate: -1
    }
  }).then((array) => {
    response.json(array);
  });
};
