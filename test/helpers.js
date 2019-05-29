
async function createUser({email, password}) {
  const mongoose = require('mongoose');
  const User = mongoose.model('user');

  newUser = new User({
    email, password,
  });
  await newUser.save();
  return newUser;
}

module.exports = { createUser }
