require('dotenv').config()
const express = require('express');
const router = express.Router();
const { getMaxListeners } = require('process');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const Register = require("../models/registerschema")

router.get('/', (req, res) => {
    res.render('forgotpassword')
});


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:process.env.EMAIL_ID,
      pass:process.env.PASSWORD
    } 
    });

router.post("/", async(req,res)=>{
    try {
        jwt_secret = process.env.JWT_SECRET;
        const user = req.body.email;

        const checkUser = await Register.findOne({emailaddress:user});
        if(checkUser){

        const secret = jwt_secret + checkUser.password
        const payload = {
          email:checkUser.emailaddress,
          id:checkUser.id
        }
  
        const token = jwt.sign(payload, secret, {expiresIn:'5m'})
        const otpMail = {
          from: 'rashivcloudsolutions@gmail.com' ,
          to: user,
          subject:'Password reset',
          
          html:`<h2>Link to Reset Password</h2>
                <h4> This is the link to reset your password. It is valid for 5 minutes.</h4>
                <a href= "http://${req.headers.host}/resetpassword/${checkUser.id}/${token}">Reset Password here</a>`
        };

        transporter.sendMail(otpMail, function(error, info){
            if (error) {
              console.log(error);
              req.flash('alert-danger','Something went wrong. Try again!!')
              return res.render('forgotpassword')
            } else {
              req.flash('alert-success','reset link has been sent.Check your mail!!')
              res.redirect('/login')
            }
          });
        }else{
          req.flash('alert-danger','Enter the registered email!!')
          return res.render('forgotpassword')
        }
     } catch (error) {
        console.log(error)
        req.flash('alert-danger','Something went wrong. Try again!!')
        return res.render('forgotpassword')
    }
})

module.exports = router;