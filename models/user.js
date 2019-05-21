const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(submittedPassword) {
  try {
    return await bcrypt.compare(submittedPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
}

const User = mongoose.model('user', userSchema);

module.exports = User;
