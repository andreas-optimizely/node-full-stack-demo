'use strict'

// Libraries
const optimizelyExpress = require('@optimizely/express'),
                express = require('express'),
                    hbs = require('express-handlebars'),
                 routes = require('./routes');

// Setting up app
const app = express();
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8080;

// Setup Optimizely

// Setting up Optimizely

app.use(express.static('public'));

/*
  Using Optimizely Express Middleware package
  (https://github.com/optimizely/express-middleware)

  This will pass the datafile + Optly object in each request
*/
// app.use(optimizely.middleware);

app.use('/', routes);

// Setting up handlebars
app.set('view engine', 'hbs');

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/pages/',
  partialsDir: __dirname + '/views/partials/'
}));

// Starting server
app.listen(PORT, HOST);

console.log(`Example App Running on http://${HOST}:${PORT}`);

module.exports = app;