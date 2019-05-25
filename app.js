const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

if (!process.env.NODE_ENV == 'test') {
  app.use( morgan('dev') );
}

app.use( bodyParser.json() );

app.use( '/users', require('./routes/users') );

module.exports = app;
