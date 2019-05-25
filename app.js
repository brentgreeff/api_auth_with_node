const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/CodeWorkr', { useNewUrlParser: true }
);

const app = express();

app.use( morgan('dev') );
app.use( bodyParser.json() );

app.use( '/users', require('./routes/users') );

module.exports = app;
