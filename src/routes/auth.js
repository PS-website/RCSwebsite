require('dotenv').config()
const express = require('express');
const router = express.Router();
const { getMaxListeners } = require('process');
const passport = require('passport')



router.get('/google',passport.authenticate('google', {scope: ['profile','email']}))
router.get('/google/callback', passport.authenticate('google', { failureRedirect:
"/"}), (req,res) =>{
  req.flash('alert-success','profile page under construction!!')
  res.redirect('/home')
})

module.exports = router;