require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const { getMaxListeners } = require('process');


const Register = require("../models/registerschema")


router.get('/', (req, res) => {
    res.render('login')
});

//checking email verification

const isNotVerified = async function(req,res,next) {
    try {
      const User = await Register.findOne({emailaddress:req.body.email});
      console.log(User.status);
      if(User.status === false){
        //return next();
        console.log("verify your email");
        res.send("verify your account");
      }else{
        //console.log("verify your email");
        return next();
      }
      
    } catch (error) {
      res.status(400).send(error);
      console.log(error)
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
    console.log("the token is" + token);

    if(comparepassword){

    console.log('logged in')
    return res.redirect('http://localhost:8080')
    }else{
    res.send("invalid")
    }
  } catch (error) {
    res.status(400).send(error);
  }

})

module.exports = router;