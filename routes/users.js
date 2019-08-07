const router = require('express-promise-router')();

const passport = require('passport');
require('../passport/jwtConf');
require('../passport/localConf');

const { validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/signup')
  .post(
    validateBody(schemas.authSchema),
    require('../controllers/users/signup')
  )

router.route('/signin')
  .post(
    validateBody(schemas.authSchema),
    passport.authenticate('local', { session: false }),
    require('../controllers/users/signin')
  )

router.route('/secret')
  .get(
    passport.authenticate('jwt', { session: false }),
    require('../controllers/users/secret')
  )

module.exports = router;
