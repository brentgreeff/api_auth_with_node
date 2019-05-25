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

module.exports = { connect };
