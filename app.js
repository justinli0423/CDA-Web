const express = require('express');

var app = express();

app.use('/', express.static('views'));
app.set('view engine', 'ejs');


app.get('/', (req, res)=>{
    res.render('home');
});

app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
});
