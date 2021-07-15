require('dotenv').config()
const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const { getMaxListeners } = require('process');
const passport = require('passport')



router.get('/google',passport.authenticate('google', {scope: ['profile','email']}))
router.get('/google/callback', passport.authenticate('google', { failureRedirect:
"/"}), (req,res) =>{
  res.redirect('/home')
})

module.exports = router;