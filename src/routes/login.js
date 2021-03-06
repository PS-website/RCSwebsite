require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getMaxListeners } = require('process');
const passport = require('passport')


const Register = require("../models/registerschema")


router.get('/', (req, res) => {
    res.render('login')
});

//checking email verification

const isNotVerified = async function(req,res,next) {
    try {
      const User = await Register.findOne({emailaddress:req.body.email});
      if(!User){
        req.flash('alert-danger','You are not registered! Register first!!')
        res.redirect('/register')
      }
      if(User.status === false){
        req.flash('alert-danger','Verify your account.Check mail!!')
        res.render('login')
      }else{
        return next();
      }
      
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

//login using details

router.post("/", isNotVerified, async(req, res) => {
    try {
    user = req.body.email,
    verifypassword = req.body.password
    const userVerification = await Register.findOne({emailaddress : user});
    const comparepassword = await bcrypt.compare(verifypassword,userVerification.password)
    if(comparepassword){
      const token = await userVerification.generateAuthToken();
      
      res.cookie('mycookie',token, {
        expires: new Date(Date.now()+ 120000),
        httpOnly:true
      });

    req.flash('alert-success','logged in')
    return res.redirect('/profile')
    }else{
    req.flash('alert-danger','wrong password!!')
    res.redirect('/login')
    }
  } catch (error) {
    res.status(400).send(error.message);
  }

})

module.exports = router;