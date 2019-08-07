const { generateToken } = require('../../helpers/tokenHelper');
const User = require('mongoose').model('user');

module.exports = async function(req, res, next) {
  const { email, password } = req.value.body;

  const existing = await User.findOne({ email })

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
}
