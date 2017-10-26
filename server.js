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
const port = process.env.PORT || 3000;

var {mongoose} = require('./db/mongoose');
// var {Comment} = require('./models/comments');
// var {Admin} = require('./models/admin');

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


// selections page
app.get('/', (req, res)=>{
  res.redirect('/intro');
});

app.get('/intro', (req, res)=>{
  // res.render('intro');
  res.redirect('/eng');
});

// loading routes for english and chinese pages
require('./routes/eng-pages.js')(app, urlencodedParser);
require('./routes/cn-pages.js')(app, urlencodedParser);

app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
