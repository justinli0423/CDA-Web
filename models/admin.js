const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// user model
var userSchema = mongoose.Schema({
  local:{
    username: String,
    password: String
  }
});

// Hash generator
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check for validity
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
