require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
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
      if(User.status === false){
        //return next();
        req.flash('alert-danger','Verify your account.Check mail!!')
        res.render('login')
      }else{
        //console.log("verify your email");
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
    const token = await userVerification.generateAuthToken();
    if(comparepassword){

    console.log('logged in')
    req.flash('alert-success','logged in')
    return res.redirect('/login')
    }else{
    //res.send("invalid")
    req.flash('alert-danger','wrong password!!')
    res.redirect('/login')
    }
  } catch (error) {
    res.status(400).send(error.message);
  }

})

router.get('/google',passport.authenticate('google', {scope: ['profile']}))
router.get('/google/callback', passport.authenticate('google', { failureRedirect:
"/"}), (req,res) =>{
  res.redirect('/home')
})

module.exports = router;