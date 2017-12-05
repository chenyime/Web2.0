const http = require('http');
const fs = require('fs');
const static = require('./static');
const router = require('./router');
const common = require('./common');
const render = require('./render');

const hostname = '127.0.0.1';
const port = 8000;

const useMiddlewares = (req, res) => (middlewares) => {
  let i = 0;
  function next() {
    middlewares[i] && middlewares[i++](req, res, next);
  }
  next();
}

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  useMiddlewares(req, res)([
    common,
    static('/public', './public'),
    render('./templates'),
    router,
  ]);
})

server.listen(port, hostname, () => {
  console.log(`${hostname}:${port}`);
});