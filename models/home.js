const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var Home = mongoose.model('Home', {
  titlep1:{
    type: String
  },
  titlep2:{
    type: String
  },
  title1:{
    type: String
  },
  text1:{
    type: String
  },
  subtitle1:{
    type: String
  },
  text2:{
    type: String
  },
  subtitle2:{
    type: String
  },
  list: [{
    type: String
  }]
});

module.exports = {
  Home
}
