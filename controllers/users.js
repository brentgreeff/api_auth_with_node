const mongoose = require('mongoose');
const User = mongoose.model('user');

const jwtConf = require('../passport/jwtConf');

const findUser = async (email) => {
  return await User.findOne({ email })
}

const { generateToken } = require('../helpers/tokenHelper');

module.exports = {

  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    const existing = await findUser(email);

    if ( existing ) {
      res.status(403).json({ error: `${email} already taken` })
      return;
    }

    const newUser = new User({
      email,
      password,
    });
    await newUser.save();

    res.status(201).json({
      user: 'created',
      token: generateToken(newUser),
    });
  },

  signIn: async (req, res, next) => {
    res.status(200).json({
      signedIn: true,
      token: generateToken(req.user)
    });
  },

  secret: async (req, res, next) => {
    res.status(200).json({ accessing: true });
  }
}
