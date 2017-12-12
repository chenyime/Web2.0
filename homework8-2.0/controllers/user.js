const userModel = require('../models').user;

exports.handleIndex = (req, res) => {
    userModel.findUser(req.query.username, (err, data) => {
      console.log(req.query.username, err, data);
      if (err) {
        return res.render('signin', { err });
      }
      if (!data.length) {
        return res.render('signin', { err: null });
      } 
      res.render('detail', data[0]);
    });
}

exports.handleSignin = (req, res) => {
  res.render('signin', { err: null });
}

exports.handleSigninSubmit = (req, res) => {
  const user = req.body;
  console.log("user", user);
  userModel.insertUser(user, (err, data) => {
    if (err) {
      return res.render('signin', { err });
    }
    res.statusCode = 302;
    res.setHeader('Location', `/?username=${user.username}`);
    res.end();
  })
}