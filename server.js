'use strict';
var express = require('express');
var path = require('path');
var mongo = require('mongodb');
var routes = require('./app/routes/index.js');
var api = require('./app/api/url.js');
var app = express();
var port =8080;
var host = 'localhost';

mongo.MongoClient.connect('mongodb://localhost:27017/my-url-shortener', function(err, db) {
if (err) throw err
console.log('Successfully connected on port 27017.');
  }
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  db.createCollection("sites", {
    capped: true,
    size: 5242880,
    max: 5000
  });

  routes(app, db);
  api(app, db);

  app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
  });

});
