require('./config/config');

const express = require('express');
const cors = require('cors');
var app = express();

const port = process.env.PORT || 3000;

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;

const nodemailer = require('nodemailer');
const passport = require('passport');
const flash = require('connect-flash');

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

cors({credentials: true, origin: true});

app.use(bodyParser.urlencoded({
  extended: true
}));

// setup express
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(cors());
// set view engine
app.set('view engine', 'ejs');

// passport setup
app.use(session({
  secret: 'adfasdf3bmert86453nsbn3434oopj7864'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', express.static('views'));

// selections page
app.get('/', (req, res)=>{
  res.redirect('/intro');
});

app.get('/intro', (req, res)=>{
  // res.render('intro');
  res.redirect('/eng');
});

// configurations for passport
require('./config/passport')(passport);

// loading routes for english and chinese pages
require('./routes/eng-pages')(app, urlencodedParser, nodemailer);
require('./routes/cn-pages')(app, urlencodedParser, nodemailer);

// auth routes
require('./routes/auth.js')(app, passport, MongoClient, urlencodedParser);

app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
