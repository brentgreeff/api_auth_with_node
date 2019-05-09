const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use( morgan('dev') );
app.use( bodyParser.json() );

app.use( '/users', require('./routes/users') );

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server UP on ${port}`);
