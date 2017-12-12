const router = require('express').Router();
const userController = require('../controllers').user;

router.get('/', userController.handleIndex)
  .get('/signin', userController.handleSignin)
  .post('/signin', userController.handleSigninSubmit);

module.exports = router;