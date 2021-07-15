require('dotenv').config()
const express = require('express');
const router = express.Router();
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const { getMaxListeners } = require('process');
const nodemailer = require('nodemailer');


const Register = require("../models/registerschema");
const register = require('../models/registerschema');


router.get('/', (req, res) => {
    res.render('register')
});


var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        //user:process.env.EMAIL_ID,
        //pass:process.env.PASSWORD
        user:"parjwalsara@gmail.com",
        pass:"pnbnuxbzoifxjywg"
    } 
    });

router.post("/", async (req, res) => {
    try{
  
      const registerEmail = req.body.email;
      
        const registerUser = new Register ({
          firstname: req.body.first_name,
          lastname: req.body.last_name,
          emailaddress: req.body.email,
          password: req.body.password,
          confirmationCode: otpGenerator.generate(6, { upperCase: false, specialChars: false }),
          status:false
        })

        const checkUser = await register.findOne({emailaddress:registerUser.emailaddress});
        if(!checkUser){
        const token = await registerUser.generateAuthToken();
  
        const verificationMail = {
          from: 'parjwalsara@gmail.com' ,
          to: registerEmail,
          subject:'RCS verification mail',
          
          html:`<h4>Verify your account to login</h4>
          <a href= "http://${req.headers.host}/register/verify_email?token=${registerUser.confirmationCode}">click here to verify</a>`
        };
        
        
        transporter.sendMail(verificationMail, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
  
        const registered = await registerUser.save();
        console.log("registration successful");
        return res.redirect("/home")
      }else{
        res.send('user already exists')
      }
  
    } catch (error) {
      res.status(400).send(error);
      console.log(error)
    }
  }) 

  router.get('/verify_email', async(req,res, next) =>{
    //generatedToken = req.body.token
    const accountVerification = await Register.findOne({confirmationCode:req.query.token});
    if(!accountVerification){
      res.send("invalid token")
    }else{
      accountVerification.status = true,
      accountVerification.confirmationCode=null
      await accountVerification.save();
      console.log("successfully verified");
      return res.redirect('http://localhost:8080/login')
    }
  })

  module.exports = router;