module.exports = function(app, urlencodedParser, nodemailer){
  // --------------------Chinese section--------------------
  app.get('/cn/', (req, res)=>{
      res.render('chinese/home');
  });

  app.get('/cn/about-us', (req, res)=>{
    res.render('chinese/about');
  });

  app.get('/cn/services', (req, res)=>{
    res.render('chinese/services');
  });

  app.get('/cn/schedule', (req, res)=>{
    res.render('chinese/schedule');
  });

  app.get('/cn/registration', (req, res)=>{
    res.render('chinese/registration');
  });

  app.post('/cn/formProcess', urlencodedParser, (req, res)=>{
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
        res.redirect('/cn/completed');
        res.status(200).send();
      }
      res.status(400).send();
    });
  });

  app.get('/cn/completed', (req, res)=>{
      res.render('chinese/completed');
  });

  app.get('/cn/testimonials', (req, res)=>{
    res.render('chinese/testimonials');
  });

  app.get('/cn/contact-us', (req, res)=>{
    res.render('chinese/contact');
  });

}
