const express = require('express');

var app = express();

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

app.get('/testimonials', (req, res)=>{
  res.render('testimonials');
});

app.get('/contact-us', (req, res)=>{
  res.render('contact');
});

app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
});
