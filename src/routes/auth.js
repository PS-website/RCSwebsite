require('dotenv').config()
const express = require('express');
const router = express.Router();
const { getMaxListeners } = require('process');
const passport = require('passport')



router.get('/google',passport.authenticate('google', {scope: ['profile','email']}))
router.get('/google/callback', passport.authenticate('google', { failureRedirect:
"/"}), (req,res) =>{
  req.flash('alert-success','google login successful')
  res.redirect('/home')
})

module.exports = router;