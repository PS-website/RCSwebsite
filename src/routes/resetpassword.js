require('dotenv').config()
const express = require('express');
const router = express.Router();
const { getMaxListeners } = require('process');
const jwt = require('jsonwebtoken')

const Register = require("../models/registerschema")


router.get("/:id/:token", async(req,res) =>{
const {id,token} = req.params
const checkid = await Register.findOne({_id:id});
if(checkid){
    const secret = process.env.JWT_SECRET+checkid.password
    try {
        const payload = jwt.verify(token,secret)
        req.flash('alert-success','change your password here!!')
        res.render('resetpassword')
    } catch (error) {
        res.send(error.message)
    }
}else{
    req.flash('alert-danger','user not found.Try again!!')
    res.redirect('/login')
}
})

router.post("/:id/:token", async(req,res) =>{
    const {id,token} = req.params
    const email = req.body.email;
    const password = req.body.password;
    const emailcheck = await Register.findOne({_id:id})
    if(!emailcheck){
      req.flash('alert-danger',"enter the correct email address!")
      res.render('resetpassword')
    }else{
      emailcheck.password = password,
      await emailcheck.save();
      req.flash('alert-success','Password change successful.Login with new password!')
      return res.redirect('/login')
    }
})

module.exports = router;