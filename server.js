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
var {Admin} = require('./models/admin');

var app = express();
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use('/', express.static('views'));
app.set('view engine', 'ejs');


// selections page
app.get('/', (req, res)=>{
  res.redirect('/intro');
});

app.get('/intro', (req, res)=>{
  res.render('intro');
});

// English pages
app.get('/eng/', (req, res)=>{
    res.render('english/home');
});

app.get('/eng/about-us', (req, res)=>{
  res.render('english/about');
});

app.get('/eng/services', (req, res)=>{
  res.render('english/services');
});

app.get('/eng/schedule', (req, res)=>{
  res.render('english/schedule');
});

app.get('/eng/registration', (req, res)=>{
  res.render('english/registration');
});

app.post('/eng/formProcess', urlencodedParser, (req, res)=>{
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
      res.redirect('/eng/completed');
      res.status(200).send();
    }
    res.status(400).send();
  });
});

app.get('/eng/completed', (req, res)=>{
    res.render('english/completed');
});

app.get('/eng/testimonials', (req, res)=>{
  res.render('english/testimonials');
});

app.get('/eng/questions', (req, res)=>{
  res.render('english/qna');
});

app.get('/eng/login', (req, res)=>{
  res.render('english/login');
});

app.post('/eng/login', (req, res)=>{
  let name = req.body.name;
  let pass = req.body.pass;
  console.log(req.body.name + " " + req.body.pass);
  if(name !== 'admin' || pass !== 'admin'){
    res.status(400).send();
  }else{
    res.render('manage');
  }
});

// to retrieve all comments
app.get('/eng/comments', (req, res)=>{
  Comment.find().then((students)=>{
    res.send({students})
  }).catch((e)=>{
    res.status(400).send();
  });
});

// Retrieving comments and call trigger method
app.post('/eng/comment', urlencodedParser, (req, res)=>{
  changeId();
  res.redirect('/eng/questions');
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

//delete comment
app.post('/eng/delete', (req, res)=>{

});

app.get('/eng/contact-us', (req, res)=>{
  res.render('english/contact');
});


// --------------------Chinese section--------------------
app.get('/cn/', (req, res)=>{
    res.render('chinese/home');
});

app.get('/cn/about-us', (req, res)=>{
  res.render('chinese/about');
});

app.get('/cn/services', (req, res)=>{
  res.render('chinese/services');
});

app.get('/cn/schedule', (req, res)=>{
  res.render('chinese/schedule');
});

app.get('/cn/registration', (req, res)=>{
  res.render('chinese/registration');
});

app.post('/cn/formProcess', urlencodedParser, (req, res)=>{
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
      res.redirect('/cn/completed');
      res.status(200).send();
    }
    res.status(400).send();
  });
});

app.get('/cn/completed', (req, res)=>{
    res.render('chinese/completed');
});

app.get('/cn/testimonials', (req, res)=>{
  res.render('chinese/testimonials');
});

app.get('/cn/questions', (req, res)=>{
  res.render('chinese/qna');
});

app.get('/cn/login', (req, res)=>{
  res.render('chinese/login');
});

app.post('/cn/login', (req, res)=>{
  let name = req.body.name;
  let pass = req.body.pass;
  console.log(req.body.name + " " + req.body.pass);
  if(name !== 'admin' || pass !== 'admin'){
    res.status(400).send();
  }else{
    res.render('manage');
  }
});

// to retrieve all comments
app.get('/cn/comments', (req, res)=>{
  Comment.find().then((students)=>{
    res.send({students})
  }).catch((e)=>{
    res.status(400).send();
  });
});

// Retrieving comments and call trigger method
app.post('/cn/comment', urlencodedParser, (req, res)=>{
  changeId();
  res.redirect('/cn/questions');
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

//delete comment
app.post('/cn/delete', (req, res)=>{

});

app.get('/cn/contact-us', (req, res)=>{
  res.render('chinese/contact');
});


app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
