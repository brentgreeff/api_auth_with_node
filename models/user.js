const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {
  changePasswordToHash, isValidPassword
} = require('../lib/authentication');

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

userSchema.pre('save', changePasswordToHash);

userSchema.methods.isValidPassword = isValidPassword

module.exports = mongoose.model('user', userSchema);
