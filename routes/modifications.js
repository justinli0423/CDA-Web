module.exports = function(app, isLoggedIn, MongoClient, urlencodedParser){
  // var {Home} = require('./models/home');

  app.get('/auth-home', isLoggedIn, (req, res) => {
    MongoClient.connect("mongodb://localhost:27017/manage", (err, db) =>{
      db.collection("home", (err, collection) => {
        collection.find().toArray((err, result) => {
          if(err){
            return err;
          }
          res.render('auth/auth-home', {
            title1: result[0].title1,
            text1: result[0].text1,
            subtitle1: result[0].subtitle1,
            text2: result[0].text2,
            subtitle2: result[0].subtitle2
          });
        });
      });
    });
  });

  // Send newly changed data background-color
  app.post('/modify', urlencodedParser, (req, res) => {
    MongoClient.connect("mongodb://localhost:27017/manage", (err, db) => {
      db.collection("home", (err, collection) => {
        var query = {title1: /^/};
        var newVal = {$set: {title1: req.body.title1}};
        collection.updateOne(query, newVal, (err, res) => {
          if(err){
            return err;
          }
          console.log(req.body.title1);
        });
      });
    });
    res.redirect('/profile');

  });

  app.get('/auth-aboutus', isLoggedIn, (req, res) => {
    res.render('auth/auth-aboutus');
  });

  app.get('/auth-registration', isLoggedIn, (req, res) => {
    res.render('auth/auth-registration');
  });

  app.get('/auth-schedule', isLoggedIn, (req, res) => {
    res.render('auth/auth-schedule');
  });

  app.get('/auth-services', isLoggedIn, (req, res) => {
    res.render('auth/auth-services');
  });

  app.get('/auth-contact', isLoggedIn, (req, res) => {
    res.render('auth/auth-contact');
  });

  app.get('/auth-testimonials', isLoggedIn, (req, res) => {
    res.render('auth/auth-testimonials');
  });

}
