module.exports = function(app, urlencodedParser){
  // acquire schema
  var {Home} = require('../models/home');
  var query = {title1: /^/};
  // English pages
  app.get('/eng', (req, res)=>{
    Home.findOne(query, (err, doc) => {
      if(err){
        return err;
      }
      res.render('english/home', {
        title1: doc.title1,
        text1: doc.text1,
        subtitle1: doc.subtitle1,
        subtitle2: doc.subtitle2,
        text2: doc.text2
      });
    });
  });

  app.get('/eng/about-us', (req, res)=>{
    res.render('english/about');
  });

  app.get('/eng/services', (req, res)=>{
    res.render('english/services');
  });

  app.get('/eng/schedule', (req, res)=>{
    res.render('english/schedule');
  });

  app.get('/eng/registration', (req, res)=>{
    res.render('english/registration');
  });

  app.post('/eng/formProcess', urlencodedParser, (req, res)=>{
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var number = req.body.number;
    var email = req.body.email;
    var course = req.body.course;
    var date = req.body.date;
    var refer = req.body.find;

    //bases transport for mailer object
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      secure: false,
      port: 25,
      auth:{
        user: "cdaregister@gmail.com",
        pass: "416419416"
      },
      tls:{
        rejectUnauthorized: false
      }
    });

    //extra settings for email
    let HelperOptions ={
      from: '"CDA Registration" <cdaregister@gmail.com',
      to: 'canadiandrivingacademy@gmail.com',
      subject: 'Student Registration',
      text: 'Name: ' + firstName + ' ' + lastName + '\n\nNumber: ' + number + '\n\nEmail: ' + email
      + '\n\nRequested Course: ' + course + '\n\nPreferred Date: ' + date + '\n\nHow Did you find us: ' + refer
    };

    //send mail here
    transporter.sendMail(HelperOptions, (error, info)=>{
      if(!error){
        res.redirect('/eng/completed');
        res.status(200).send();
      }
      res.status(400).send();
    });
  });

  app.get('/eng/completed', (req, res)=>{
      res.render('english/completed');
  });

  app.get('/eng/testimonials', (req, res)=>{
    res.render('english/testimonials');
  });

  app.get('/eng/questions', (req, res)=>{
    res.render('english/qna');
  });

  // to retrieve all comments (disabled for now)
  // app.get('/eng/comments', (req, res)=>{
  //   Comment.find().then((students)=>{
  //     res.send({students})
  //   }).catch((e)=>{
  //     res.status(400).send();
  //   });
  // });

  // Retrieving comments and call trigger method (disabled for now)
  // app.post('/eng/comment', urlencodedParser, (req, res)=>{
  //   changeId();
  //   res.redirect('/eng/questions');
  //   let comment = new Comment({
  //     name : req.body.name,
  //     email: req.body.email,
  //     comment: req.body.comment
  //   });
  //   comment.save().then((doc)=>{
  //     res.send(doc);
  //   }).catch((e)=>{
  //     res.status(400).send();
  //   });
  // });

  //delete comment
  // app.post('/eng/delete', (req, res)=>{
  //
  // });

  app.get('/eng/contact-us', (req, res)=>{
    res.render('english/contact');
  });

}
