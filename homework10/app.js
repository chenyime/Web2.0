const express = require('express');
const router = require('./routes');
const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

const port = 3000;

// Express依赖bodyParser对请求的包体进行解析
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser('signin'));
app.use(session({
  resave: true, // don't save session if unmodified  
  saveUninitialized: false,
  secret: 'signin',
}))
app.use('/public', express.static('public'));
app.use(router);
app.set('views', './templates')
app.set('view engine', 'ejs');

const server = app.listen(port, () => {
  console.log(`:${port}`);
})