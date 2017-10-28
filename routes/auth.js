module.exports = function(app, passport, MongoClient){
  // login
  app.get('/login', (req, res) => {
    res.render('auth/login', {
      message: req.flash('loginMessage')
    });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  // signup
  app.get('/signup', (req, res) => {
    res.render('auth/signup', {
      message: req.flash('signupMessage')
    });
  });

  // process signup
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  // profile
  app.get('/profile', isLoggedIn, (req, res) => {
    var text;
    MongoClient.connect("mongodb://localhost:27017/manage", (err, db) => {
      db.collection("data", (err, collection) => {
        collection.find().toArray((err, result) => {
          if(err){
            return err;
          }
          res.render('auth/profile', {
            user: req.user,
            text: result[0].string
          });
        });
      });
    });
  });

  // page edits
  app.get('/auth-home', isLoggedIn, (req, res) => {
    res.render('/auth/auth-home');
  });

  // logout
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // middleware for checking if user is logged in
  function isLoggedIn(req, res, next){
    // move on if authenticated
    if(req.isAuthenticated()){
      return next();
    }
    // redirect to home otherwise
    res.redirect('/login');
  }
}
