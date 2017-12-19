const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://127.0.0.1:27017/homework";

let _db = null;

exports.getDB = (callback) => {
  if (_db) {
    return callback(null, _db);
  }
  MongoClient.connect(url, function(err, db) {
    // Paste the following examples here
    _db = db;
    callback(err, db);
  });
}
