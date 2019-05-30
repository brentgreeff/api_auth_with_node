const { generateToken } = require('../../helpers/tokenHelper');

module.exports = async function(req, res, next) {
  res.status(200).json({
    signedIn: true,
    token: generateToken(req.user)
  });
};
