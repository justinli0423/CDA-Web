const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

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
  var data = req.body.firstName;
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

  let HelperOptions ={
    from: '"CDA Registration" <cdaregister@gmail.com',
    to: 'justin.li0423@gmail.com',
    subject: 'Student Registration',
    text: 'Pce'
  };

  transporter.sendMail(HelperOptions, (error, info)=>{
    if(error){
      return console.log(error);
    }else{
      console.log("msg was sent");
      console.log(data);
    }
  });
});

app.get('/testimonials', (req, res)=>{
  res.render('testimonials');
});

app.get('/questions', (req, res)=>{
  res.render('qna');
});

app.get('/contact-us', (req, res)=>{
  res.render('contact');
});

app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
});
