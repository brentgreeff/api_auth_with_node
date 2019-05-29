const mongoose = require('mongoose');

function connect() {
  return new Promise( (resolve, reject) => {
    let dbUrl = 'mongodb://localhost/CodeWorkr';

    if (process.env.NODE_ENV == 'test') {
      dbUrl = 'mongodb://localhost/CodeWorkrTEST'
    }
    mongoose.connect(dbUrl, { useNewUrlParser: true })
      .then((res, err) => {
        if (err) return reject(err);
        resolve();
      });
  });
}

function drop() {
  return new Promise(function(resolve, reject) {
    mongoose.connection.dropDatabase( () => {
      mongoose.connection.close( () => resolve() );
    });
  });
}

module.exports = { connect, drop };
