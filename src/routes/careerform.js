require('dotenv').config()
const express = require('express');
const router = express.Router();
const { getMaxListeners } = require('process');
const nodemailer = require('nodemailer');
const multer = require('multer')
const fs = require('fs')

const Careerform = require("../models/careeformschema")


router.get('/', (req, res) => {
    res.render('careers')
});


//careers form

//Using nodemailer and multer

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      //user:process.env.EMAIL_ID,
      //pass:process.env.PASSWORD
      user:"parjwalsara@gmail.com",
      pass:"pnbnuxbzoifxjywg"
    } 
    });
  
  var fullname
  var emailadd
  var phonenumber
  var messageinfo
  var filepath
  var emailmessage
  
  
  var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./resumes");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
  });
  

  var upload = multer({
    storage: Storage
  }).single("resume"); //Field name and max count
  
 router.post('/', async(req,res) => {
    upload (req,res,function(err){
        if(err){
            console.log(err)
            return res.end("Something went wrong!");
        }else{

            fullname = req.body.full_name,
            emailadd = req.body.email,
            phonenumber = req.body.phone,
            vacancyIn = req.body.course,
            messageinfo = req.body.message,
            filepath = req.file.path,
            emailmessage = `
            <h4>You have new request!!</h4>
            <h3>contact details</h3>
            <ul>
              <li>Name:${fullname}</li>
              <li>email:${emailadd}</li>
              <li>phone:${phonenumber}</li>
              <li>Applied for vacancy in:${vacancyIn}</li>
            </ul>
            <h4>Message</h4>
            <p>${messageinfo}</p>`
  
            const vacancyRequests = new Careerform ({
              fullname: fullname,
              Contactnumber: phonenumber,
              contactEmail: emailadd,
              coursetype: vacancyIn,
              messageAdded: messageinfo,
            })
            const dataentered = vacancyRequests.save();
  
            console.log("request successful");
  
              
              var mailOptions = {
                from: emailadd ,
                to: "parjwalsara@gmail.com",
                subject:'RCS testmail',
                text:'Name:'+ fullname + 
                     'contact:'+ phonenumber + 
                    'message:'+ messageinfo,
                html: emailmessage,
                attachments: [
                  {
                   path: filepath
                  }
               ]
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  fs.unlink(filepath,function(err){
                    if(err){
                        return res.end(err)
                    }else{
                        console.log("deleted")
                        return res.render('careers')
                    }
                  })
                }
              });
        }
    })
  })

  module.exports = router;