// load all components
var LocalStrategy = require('passport-local').Strategy;

// Load up user model
var User = require('../models/admin');

module.exports = function(passport){
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });

  // local signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
    function(req, email, password, done){
      process.nextTick(() => {
        User.findOne({'local.username': username}, (err, user) => {
          if(err){
            return done(err);
          }

          // Check to see if user exists with that email
          if(user){
            return done(null, false, req.flash('signupMessage', 'Email exists'));
          }else{
            var newUser = new User();

            // setup local credentials
            newUser.local.username = username;
            newUser.local.password = newUser.generateHash(password);

            // save user
            newUser.save((err) =>{
              if(err){
                throw err;
              }
              return done(null, newUser);
            });
          }
        });
      });
  }));
};
