const fs = require('fs');

exports.findUser = (username, callback) => {
  fs.readFile('./store.json', 'utf-8', function(err, data) {
    if (err) {
      return callback(err, null);
    } 
    try {
      const users = JSON.parse(data) || [];
      let result = null;
      users.forEach(item => {
        if (item.username == username) {
          result = item;
        }
      })
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  });
}

exports.insertUser = (user, callback) => {
  fs.readFile('./store.json', 'utf-8', function(err, data) {
    if (err) {
      return callback(err, null);
    } 
    try {
      const users = JSON.parse(data) || [];
      let errMess = '';
      users.forEach(item => {
        if (item.username == user.username) {
          errMess = 'username is used';
        }
        if (item.id == user.id) {
          errMess = errMess || 'id is used';
        }
        if (item.tel == user.tel) {
          errMess = errMess || 'tel number is used';
        }
        if (item.mail == user.mail) {
          errMess = errMess || 'email is used';
        }
      })
      if (errMess) {
        return callback(errMess, null);
      }
      users.push(user);
      fs.writeFile('./store.json', JSON.stringify(users), (err) => {
        console.log(err);
        if (err) {
          return callback(err, null);
        }
        callback(null, user);
      })
    } catch (e) {
      callback(e, null);
    }
  });
}