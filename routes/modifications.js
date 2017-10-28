module.exports = function(app, isLoggedIn, MongoClient, urlencodedParser){
  app.get('/auth-home', isLoggedIn, (req, res) => {
    res.render('auth/auth-home');
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
