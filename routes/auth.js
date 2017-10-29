module.exports = function(app, passport, MongoClient, urlencodedParser){
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
    res.render('auth/profile');
  });

  // page edits
  require('./modifications')(app, isLoggedIn, MongoClient, urlencodedParser);


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
