const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Admin = mongoose.model('Admin', {
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

module.exports = {
  Admin
}
