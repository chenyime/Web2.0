const fs = require('fs');
const url = require('url');
const controller = require('./controller');

const map = {
  '/': {
    'GET': controller.handleIndex,
  },
  '/signin': {
    'GET': controller.handleSignin,
    'POST': controller.handleSigninSubmit,
  }
}

module.exports = (req, res, next) => {
  const pathname = req.pathname;
  const methods = map[pathname];
  if (methods) {
    methods[req.method] && methods[req.method](req, res);
  }
  next();
}