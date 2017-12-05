const fs = require('fs');

module.exports = (path) => (req, res, next) => {
  const render = (name, params = {err: ''}) => {
    fs.readFile(`${path}/${name}.html`, 'utf-8', function(err, data) {
      if(!err && params) {
        const now = data.replace(/<%=([^%>]+)?%>/g, function(s0, s1) {
          return params[s1];
        })
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(now);
      } else if (err) {
        res.statusCode = 200;
        res.end(err.message);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    })
  }
  res.render = render;
  next();
}