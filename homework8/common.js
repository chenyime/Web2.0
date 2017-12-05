const url = require('url');
const querystring = require('querystring');

module.exports = (req, res, next) => {
  const { pathname, query } = url.parse(req.url);
  req.query = query ? querystring.parse(query) : {};
    // query.split('&').forEach(item => {
    //   const [key, value] = item.split('=');
    //   if (key) {
    //     queryObject[key] = value;
    //   }
    // });
  req.pathname = pathname;

  if (req.method == 'POST') {
    let body = '';
    req.on('data', (data) => body += data);
    req.on('end',() =>  {
      req.body = querystring.parse(body);
      next();
    });
  } else {
    next();
  }
  
}