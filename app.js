const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');

require('./models/User');
const app = express();

if (!process.env.NODE_ENV == 'test') {
  app.use( morgan('dev') );
}

app.use( bodyParser.json() );

app.use( '/users', require('./routes/users') );

module.exports = app;
