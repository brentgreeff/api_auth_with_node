module.exports = {

  signUp: async (req, res, next) => {
    console.log('UsersController.signUp() called');
    console.log(req.value.body);
  },

  signIn: async (req, res, next) => {
    console.log('UsersController.signIn() called');
  },

  secret: async (req, res, next) => {
    console.log('UsersController.secret() called');
  }
}
