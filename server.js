require('./config/config');

const express = require('express');
const nodemailer = require('nodemailer');
const promise = require('promise');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

var {mongoose} = require('./db/mongoose');

const port = process.env.PORT || 3000;

var app = express();
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use('/', express.static('views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'adfasdf3bmert86453nsbn3434oopj7864'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// selections page
app.get('/', (req, res)=>{
  res.redirect('/intro');
});

app.get('/intro', (req, res)=>{
  // res.render('intro');
  res.redirect('/eng');
});

// configurations for passport
require('./config/passport.js')(passport);

// loading routes for english and chinese pages
require('./routes/eng-pages.js')(app, urlencodedParser);
require('./routes/cn-pages.js')(app, urlencodedParser);

// auth routes
require('./routes/auth.js')(app, passport);

app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
