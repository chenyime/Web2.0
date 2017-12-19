const userModel = require('../models').user;
const md5 = require('js-md5');

exports.handleIndex = (req, res) => {
  if (typeof(req.session.userdetail) == "undefined") {
    return res.render('signin', { err: null });
  }
  if (req.query.username && req.session.userdetail.username != req.query.username) {
    res.render('signin', { err: '只能够访问自己的数据' });
  } else {
    res.render('detail', req.session.userdetail);
  }
}

exports.handleSigninSubmit = (req, res) => {
  const user = req.body;
  userModel.findSigninUser(user, (err, data) => {
    if (err) {
      return res.render('signin', err);
    }
    if (!data) {
      return res.render('signin', { err: '错误的用户名或者密码' });
    }
    req.session.userdetail = data[0];
    req.session.cookie.maxAge = 3600000;
    res.render('detail', data[0]);
  })
}

exports.handleRegist = (req, res) => {
  res.render('regist', { err: null });
}

exports.handleRegistSubmit = (req, res) => {
  const user = req.body;
  user.password = md5(user.password);
  userModel.insertUser(user, (err, data) => {
    if (err) {
      return res.render('regist', { err });
    }
    req.session.userdetail = data;
    req.session.cookie.maxAge = 3600000;
    res.statusCode = 302;
    res.redirect(301, `/?username=${user.username}`);
    res.end();
  })
}

exports.handleLogout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect(301, '/');
  });
}