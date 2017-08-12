const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Comment = mongoose.model('Comment', {
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  comment:{
    type: String,
    required: true
  }
});

module.exports = {
  Comment
}
