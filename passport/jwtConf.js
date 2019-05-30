const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const mongoose = require('mongoose');
const User = mongoose.model('user');
const { JWT_SECRET } = require('../configuration');

jwt = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET,
}, getUserFromPayload);

passport.use(jwt);

async function getUserFromPayload(payload, done) {
  try {
    const user = await User.findById(payload.sub);

    if (user) {
      done(null, user);
    } else {
      done('Provide valid auth token', false);
    }
  } catch (error) {
    done(error, false)
  }
}
