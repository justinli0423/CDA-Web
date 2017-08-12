require('./config/config');

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const promise = require('promise');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

const port = process.env.PORT || 3000;

var {mongoose} = require('./db/mongoose');
var {Comment} = require('./models/comments');

var app = express();
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

app.use('/', express.static('views'));
app.set('view engine', 'ejs');


app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/about-us', (req, res)=>{
  res.render('about');
});

app.get('/services', (req, res)=>{
  res.render('services');
});

app.get('/schedule', (req, res)=>{
  res.render('schedule');
});

app.get('/registration', (req, res)=>{
  res.render('registration');
});

app.post('/formProcess', urlencodedParser, (req, res)=>{
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var number = req.body.number;
  var email = req.body.email;
  var course = req.body.course;
  var date = req.body.date;
  var refer = req.body.find;

  //bases transport for mailer object
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: false,
    port: 25,
    auth:{
      user: "cdaregister@gmail.com",
      pass: "416419416"
    },
    tls:{
      rejectUnauthorized: false
    }
  });

  //extra settings for email
  let HelperOptions ={
    from: '"CDA Registration" <cdaregister@gmail.com',
    to: 'canadiandrivingacademy@gmail.com',
    subject: 'Student Registration',
    text: 'Name: ' + firstName + ' ' + lastName + '\n\nNumber: ' + number + '\n\nEmail: ' + email
    + '\n\nRequested Course: ' + course + '\n\nPreferred Date: ' + date + '\n\nHow Did you find us: ' + refer
  };

  //send mail here
  transporter.sendMail(HelperOptions, (error, info)=>{
    if(!error){
      res.redirect('/completed');
      res.status(200).send();
    }
    res.status(400).send();
  });
});

app.get('/completed', (req, res)=>{
    res.render('completed');
});

app.get('/testimonials', (req, res)=>{
  res.render('testimonials');
});

app.get('/questions', (req, res)=>{
  res.render('qna');
});


// Retrieving comments and call trigger method
app.post('/comment', urlencodedParser, (req, res)=>{
  let comment = new Comment({
    name : req.body.name,
    email: req.body.email,
    comment: req.body.comment
  });
  comment.save().then((doc)=>{
    res.send(doc);
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.get('/contact-us', (req, res)=>{
  res.render('contact');
});

app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
