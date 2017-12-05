const model = require('./model');

exports.handleIndex = (req, res) => {
    model.findUser(req.query.username, (err, data) => {
      if (err) {
        res.render('signin', { err });
      }
      if (!data) {
        return res.render('signin');
      } 
      res.render('detail', data);
    });
}

exports.handleSignin = (req, res) => {
  res.render('signin');
}

exports.handleSigninSubmit = (req, res) => {
  const user = req.body;
  console.log(user);
  model.insertUser(user, (err, data) => {
    if (err) {
      return res.render('signin', { err });
    }
    res.statusCode = 302;
    res.setHeader('Location', `/?username=${user.username}`);
    res.end();
  })
}