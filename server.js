const app = require('./app');
const db = require('./db');

const port = process.env.PORT || 3000;

db.connect()
  .then(() => {
    console.log(`Connected to MongoDB.`);

    app.listen(port, () => {
      console.log(`Server UP on ${port}`);
    });
  });
