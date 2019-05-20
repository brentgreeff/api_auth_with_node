const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');
const jwtConf = require('../passport/jwtConf');

const findUser = async (email) => {
  return await User.findOne({ email })
}

const oneDayFromNow = () => {
  return new Date().setDate( new Date().getDate() + 1);
}

const getToken = (user) => {
  return JWT.sign({
    sub: user.id,
    iss: 'Shnoopsta Ltd',
    iat: new Date().getTime(),
    exp: oneDayFromNow(),
  }, JWT_SECRET);
}

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
      token: getToken(newUser),
    });
  },

  signIn: async (req, res, next) => {
    console.log('UsersController.signIn() called');
  },

  secret: async (req, res, next) => {
    res.status(200).json({ accessing: true });
  }
}
