const fs = require('fs');
const getDB = require('../db').getDB;
const md5 = require('js-md5');

// exports.findUser = (username, callback) => {
//   getDB((err, db) => {
//     if (err) {
//       return callback(err, null);
//     }
//     let user = db.collection('users').find({ username: username }).toArray((err, result) => {
//       console.log(result);
//       if (err) {
//         return callback(err, null);
//       }
//       callback(null, result);
//     });
//   })
// }

exports.findSigninUser = (user, callback) => {
  getDB((err, db) => {
    if (err) {
      return callback(err, null);
    }
    db.collection('users').find({ username: user.username }).toArray((err, result) => {
      if (err) {
        return callback(err, null);
      }
      if (result.length) {
        if (md5(user.password) == result[0].password) {
          return callback(null, result);
        }
      }
      callback(null, null);
    })
  })
}

exports.insertUser = (user, callback) => {
  getDB((err, db) => {
    if (err) {
      return callback(err, null);
    }
    let errMess = '';
    // let db.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )
    db.collection('users').find({ $or: [
      { username: user.username }, 
      { id: user.id }, 
      { tel: user.tel }, 
      { mail: user.mail },
    ] }).toArray((err, result) => {
      if (err) {
        return callback(err, null);
      }
      if (result.length) {
        if (result[0].username == user.username) {
          errMess = 'username is used';
        }
        if (result[0].id == user.id) {
          errMess = errMess || 'id is used';
        }
        if (result[0].tel == user.tel) {
          errMess = errMess || 'tel number is used';
        }
        if (result[0].mail == user.mail) {
          errMess = errMess || 'email is used';
        }
        // console.log("errMess", errMess);
        return callback(errMess, null);
      }
      db.collection('users').insertOne({
        username: user.username,
        id: user.id,
        tel: user.tel,
        mail: user.mail,
        password: user.password,
      }).then((result) => {
        callback(null, user);
      })
    })
  })
}