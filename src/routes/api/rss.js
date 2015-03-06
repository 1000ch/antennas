'use strict';

const Database   = require('../../data/database');

module.exports = function (request, response) {

  let database = new Database();
  let items    = database.collection('items');

  items.find({}, (error, array) => {
    response.json(array);
  });
};
