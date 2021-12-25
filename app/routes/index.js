const getRoutes = require('./employee-get-route');
const postRoutes = require('./employee-post-route');
const putRoutes = require('./employee-put-route');
const deleteRoutes = require('./employee-delete-route');
const homeRoutes = require('./employee-home-route');
const loadDatabase = require('../data/setup-database');

module.exports = function (app, db) {

  // create database in case it was not created yeat, 
  // or update in case of migrations
  loadDatabase(db);

  // start routes
  getRoutes(app, db);
  postRoutes(app, db);
  putRoutes(app, db);
  deleteRoutes(app, db);
  homeRoutes(app, db);

};
