const bcrypt = require('bcryptjs');

module.exports = {

  changePasswordToHash: async function(next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  },

  isValidPassword: async function(submittedPassword) {
    try {
      return await bcrypt.compare(submittedPassword, this.password);
    } catch (error) {
      throw new Error(error);
    }
  }
}
