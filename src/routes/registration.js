require('dotenv').config()
const express = require('express');
const router = express.Router();
const otpGenerator = require('otp-generator');
const { getMaxListeners } = require('process');
const nodemailer = require('nodemailer');

const Register = require("../models/registerschema");

router.get('/', (req, res) => {
    res.render('register')
});


var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_ID,
        pass:process.env.PASSWORD
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

        const checkUser = await Register.findOne({emailaddress:registerUser.emailaddress});
        if(!checkUser){
        const token = await registerUser.generateAuthToken();
        res.cookie('mycookie',token, {
          expires: new Date(Date.now()+ 120000),
          httpOnly:true
        });
  
        const verificationMail = {
          from: 'rashivcloudsolutions@gmail.com' ,
          to: registerEmail,
          subject:'RCS verification mail',
          
          html:`
          <h4>Welcome to RCS</h4>
          <h4>Thanks for registering</h4>
          <h4>Verify your account to login</h4>
          <a href= "http://${req.headers.host}/register/verify_email?token=${registerUser.confirmationCode}">Verify here</a>`
        };
        
        const registered = await registerUser.save();
        if(!registered){
          req.flash('alert-danger','Something went wrong.Try again!!')
          return res.redirect('/register')
        }
        transporter.sendMail(verificationMail, function(error, info){
          if (error) {
            console.log(error);
            req.flash('alert-danger','something went wrong. Try again!')
            res.redirect('/register')
          } else {
            req.flash('alert-success','Registered.Verification link has been sent!!')
            return res.redirect("/login")
          }
        });
  
      }else{
        req.flash('alert-danger','User already exists!!')
        res.render('register')
      }
  
    } catch (error) {
      res.status(400).send(error);
      console.log(error)
    }
  }) 

  router.get('/verify_email', async(req,res, next) =>{
    const accountVerification = await Register.findOne({confirmationCode:req.query.token});
    if(!accountVerification){
      req.flash('alert-danger','Invalid link')
      res.redirect('/register')
    }else{
      accountVerification.status = true,
      accountVerification.confirmationCode=accountVerification.id
      await accountVerification.save();
      req.flash('alert-success','successfully verified!!')
      return res.redirect('/login')
    }
  })

  module.exports = router;