const express = require('express');
const router = express.Router();
const { getMaxListeners } = require('process');
const cookieverify = require('./cookieverify')


router.get('/',cookieverify, (req,res) =>{

    req.profiledata.tokens = req.profiledata.tokens.filter((currenttoken) =>{
        return currenttoken.token !== req.cookie
    })
    res.clearCookie('mycookie')
    req.profiledata.save()
    console.log('logged out successfully')
    req.flash('alert-success','logged out successfully')
    res.redirect('/home')
})

module.exports = router;