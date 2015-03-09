'use strict';

const Database   = require('../../database');

module.exports = {
  get: function (request, response) {

    let database = new Database();
    let items    = database.collection('urls');

    items.find({}, {
      sort: {
        pubdate: -1
      }
    }).then((array) => {
      response.status(200).json(array);
    }, (error) => {
      response.status(400).json({
        message: error
      });
    });
  },
  post: function (request, response) {

    console.log(request.body.url);

    let database = new Database();
    let items    = database.collection('urls');

    items.insert({
      link: request.body.url,
      title: request.body.title
    }).then(() => {
      response.status(204).json({
        message: `${request.body.url} is successfully added`
      });
    }, (error) => {
      response.status(400).json({
        message: error
      });
    });
  },
  put: function (request, response) {

    console.log(request.body.title);
    console.log(request.body.url);

    let database = new Database();
    let items    = database.collection('urls');

    items.update({
      link: request.body.url
    }, {
      link: request.body.url,
      title: request.body.title
    }).then(() => {
      response.status(204).json({
        message: `${request.body.url} is successfully updated`
      });
    }, (error) => {
      response.status(400).json({
        message: error
      });
    });
  },
  delete: function (request, response) {

    console.log(request.body.url);

    let database = new Database();
    let items    = database.collection('urls');

    items.remove({
      link: request.body.url
    }).then(() => {
      response.status(204).json({
        message: `${request.body.url} is successfully deleted`
      });
    }, (error) => {
      response.status(400).json({
        message: error
      });
    });
  }
};
