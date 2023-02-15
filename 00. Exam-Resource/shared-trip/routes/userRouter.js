const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router
  .route('/login')
  .get(userController.getLoginPage)
  .post(authController.login);

router
  .route('/register')
  .get(userController.getRegisterPage)
  .post(authController.register);

router.route('/logout').get(authController.logout);

router.route('/profile').get(userController.getProfile);

module.exports = router;
