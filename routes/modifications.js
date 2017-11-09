module.exports = function(app, isLoggedIn, MongoClient, urlencodedParser){
  // acquire schema
  var {Home} = require('../models/home');
  var {Testimonial} = require('../models/testimonials');

  app.get('/auth-home', isLoggedIn, (req, res) => {
    var query = {title1: /^/};
    Home.findOne(query, (err, doc) => {
      if(err){
        return err;
      }
      res.render('auth/auth-home', {
        titlep1: doc.titlep1,
        titlep2: doc.titlep2,
        title1: doc.title1,
        text1: doc.text1,
        subtitle1: doc.subtitle1,
        subtitle2: doc.subtitle2,
        text2: doc.text2,
        list: doc.list
      });
    });
  });

  app.post('/modify', urlencodedParser, (req, res) => {
    res.redirect('/profile');
    var query = {title1: /^/};
    // upsert creates if query isn't found
    Home.findOneAndUpdate(query, {
      titlep1: req.body.titlep1,
      titlep2: req.body.titlep2,
      title1: req.body.title1,
      text1: req.body.text1,
      subtitle1: req.body.subtitle1,
      subtitle2: req.body.subtitle2,
      text2: req.body.text2
    }, {upsert:true}, (err, doc) => {
      if(err){
        return err;
      }
      console.log("success");
    });
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

  // post request for new testimonials
  app.post('/commentSubmit', urlencodedParser, (req, res) => {
    res.redirect('/profile');
    let comment = req.body.comment;
    // The /xxx/g will replace all 'xxx' within the string
    comment = comment.replace(/\r\n/g, "<br />");
      let testimonial = new Testimonial({
        comment
      });
      testimonial.save().then((doc)=>{
        console.log("success");
        res.send(doc);
      }).catch((e)=>{
        res.status(400).send();
      });
  });

}
