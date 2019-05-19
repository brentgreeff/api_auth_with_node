const User = require('../models/user');

const findUser = async ({email}) => {
  return await User.findOne({ email })
}

module.exports = {

  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    if ( findUser({ email }) ) {
      res.status(403).json({ error: `${email} already taken` })
      return;
    }

    const newUser = new User({
      email,
      password,
    });
    await newUser.save();

    res.status(201).json({ user: 'created' });
  },

  signIn: async (req, res, next) => {
    console.log('UsersController.signIn() called');
  },

  secret: async (req, res, next) => {
    console.log('UsersController.secret() called');
  }
}
