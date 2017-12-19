const router = require('express').Router();
const userController = require('../controllers').user;

router.get('/', userController.handleIndex)
  .post('/', userController.handleSigninSubmit)
  .get('/regist', userController.handleRegist)
  .post('/regist', userController.handleRegistSubmit)
  .post('/logout', userController.handleLogout)

module.exports = router;