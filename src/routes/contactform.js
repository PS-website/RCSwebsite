require('dotenv').config()
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const { getMaxListeners } = require('process');

const Contactform = require("../models/contactformschema")


router.get('/', (req, res) => {
    res.render('contact')
});

router.post('/', (req,res) => {
    const emailmessage = `
    <h2>New contact request!!</h2>
    <h3>Contact Details:</h3>
    <ul>  
      <li>Name: ${req.body.full_name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
      <li>Courses interested in:  ${req.body.course}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
    //send mail here

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
          //user:process.env.EMAIL_ID,
          //pass:process.env.PASSWORD
          user:"parjwalsara@gmail.com",
          pass:"pnbnuxbzoifxjywg"
        } 
        });

    const mailOptions = {
        from: req.body.email ,
        to: "parjwalsara@gmail.com",
        subject:"Contactform request!!",
        text:'Name:'+ req.body.full_name + 
            'contact:'+ req.body.phone + 
            'course:'+req.body.course +
            'message:'+ req.body.message,
        html: emailmessage,
              };

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  req.flash('alert-danger','Your form is not submitted.Try again!!')
                  return res.redirect('/contactUs')
                } else {

                  req.flash('alert-success','submitted successfully!You will be contacted soon!!')

                  const contactRequests = new Contactform ({
                    fullname: req.body.full_name,
                    contactnumber: req.body.phone,
                    contactEmail: req.body.email,
                    coursetype: req.body.course,
                    messageAdded: req.body.message,
                  })
                  const dataentered = contactRequests.save();
        
                  res.render('contact')
                }
              });
    
});

module.exports = router;