const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

local = new LocalStrategy({
  usernameField: 'email',
}, getUserFromCredentials);

passport.use(local);

async function getUserFromCredentials (email, password, done) {
  try {
    const user = await User.findOne({ email });
    if (!user) return done('invalid credentials', false);

    const correctPassword = await user.isValidPassword(password)
    if (!correctPassword) return done('Wrong password', false);

    done(null, user);
  } catch (error) {
    done(error, false);
  }
}
