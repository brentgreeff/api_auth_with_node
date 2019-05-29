const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../configuration');

const generateToken = (user) => {
  return JWT.sign({
    sub: user.id,
    iss: 'Shnoopsta Ltd',
    iat: new Date().getTime(),
    exp: oneDayFromNow(),
  }, JWT_SECRET);
}

function oneDayFromNow() {
  return new Date().setDate( new Date().getDate() + 1);
}

module.exports = { generateToken };
