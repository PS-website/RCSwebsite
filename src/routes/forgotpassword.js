require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
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
      //user:process.env.EMAIL_ID,
      //pass:process.env.PASSWORD
      user:"parjwalsara@gmail.com",
      pass:"pnbnuxbzoifxjywg"
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
  
        const token = jwt.sign(payload, secret, {expiresIn:'10m'})
        const otpMail = {
          from: 'parjwalsara@gmail.com' ,
          to: user,
          subject:'Password reset',
          
          html:`<h2>Link to resetpassword</h2>
                <h3>Click on below link to reset your password. This link is valid only for 10 minutes.</h3>
                <a href= "http://${req.headers.host}/resetpassword/${checkUser.id}/${token}">click here to change password</a>`
        };

        transporter.sendMail(otpMail, function(error, info){
            if (error) {
              console.log(error);
              req.flash('alert-danger','Something went wrong. Try again!!')
            } else {
              req.flash('alert-success','reset link has been sent.Check your mail!!')
              res.redirect('/login')
            }
          });
        }else{
          req.flash('alert-danger','Enter the registered email!!')
        }
     } catch (error) {
        console.log(error)
        req.flash('alert-danger','Something went wrong. Try again!!')
    }
})

module.exports = router;