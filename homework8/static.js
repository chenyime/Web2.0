const fs = require('fs');
const url = require('url');

const type = {
  'js': 'application/javascript',
  'css': 'text/css',
};

module.exports = (route, path) => (req, res, next) => {
  const pathname = req.pathname;
  if ((new RegExp(`^${route}/(.+)$`)).test(pathname)) {
    const file = RegExp.$1;
    const suffix = file.replace(/^(.+)\./, '');
    fs.readFile(`${path}/${file}`, 'utf-8', (err, data) => {
      if (err) {
        res.statusCode = 404;
        return res.end();
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', type[suffix] || 'text/plain');
      res.end(data);
    })
  } else {
    next();
  }
}