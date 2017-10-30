module.exports = function(app, isLoggedIn, MongoClient, urlencodedParser){
  // var {Home} = require('./models/home');

  app.get('/auth-home', isLoggedIn, (req, res) => {
    MongoClient.connect("mongodb://cda_web:Justin_199898li@ds127982.mlab.com:27982/heroku_d48w58zm", (err, db) =>{
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
    MongoClient.connect("mongodb://cda_web:Justin_199898li@ds127982.mlab.com:27982/heroku_d48w58zm", (err, db) => {
      db.collection("home", (err, collection) => {
        var querytitle1 = {title1: /^/};
        var title1 = {$set: {title1: req.body.title1}};
        var querytext1 = {text1: /^/};
        var text1 = {$set: {text1: req.body.text1}};
        var querysubtitle1 = {subtitle1: /^/};
        var subtitle1 = {$set: {subtitle1: req.body.subtitle1}};
        var querytext2 = {text2: /^/};
        var text2 = {$set: {text2: req.body.text2}};
        var querysubtitle2 = {subtitle2: /^/};
        var subtitle2 = {$set: {subtitle2: req.body.subtitle2}};
        collection.updateOne(querytitle1, title1, (err, res) => {
          if(err){
            return err;
          }
        });
        collection.updateOne(querytext1, text1, (err, res) => {
          if(err){
            return err;
          }
        });
        collection.updateOne(querysubtitle1, subtitle1, (err, res) => {
          if(err){
            return err;
          }
        });
        collection.updateOne(querytext2, text2, (err, res) => {
          if(err){
            return err;
          }
        });
        collection.updateOne(querysubtitle2, subtitle2, (err, res) => {
          if(err){
            return err;
          }
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
