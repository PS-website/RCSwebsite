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
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.fullname}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
      <li>Courses interested in:  ${req.body.courses}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
    //send mail here
    console.log('Data: ', req.body);

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
          user:process.env.EMAIL_ID,
          pass:process.env.PASSWORD
        } 
        });

        const contactRequests = new Contactform ({
            fullname: req.body.full_name,
            Contactnumber: req.body.phone,
            contactEmail: req.body.email,
            coursetype: req.body.courses,
            messageAdded: req.body.message,
          })
          const dataentered = contactRequests.save();

          console.log("request successful");
    
    const mailOptions = {
        from: req.body.email ,
        to: process.env.EMAIL_ID,
        subject:"Contact " + req.body.fullname,
        text:'Name:'+ req.body.fullname + 
            'contact:'+ req.body.phone + 
            'message:'+ req.body.message,
        html: emailmessage,
              };

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  res.render('contact')
                }
              });
    
});

module.exports = router;