const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var Testimonial = mongoose.model('Testimonial', {
  comment:{
    type: String
  }
});

module.exports = {
  Testimonial
}
