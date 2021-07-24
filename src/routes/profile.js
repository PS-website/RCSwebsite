const express = require('express');
const router = express.Router();
const { getMaxListeners } = require('process');
const cookieverify = require('./cookieverify')
require('./login');

router.get('/', cookieverify, (req,res) =>{
    res.render('profile',{name:req.profiledata.firstname,email:req.profiledata.emailaddress })
})

module.exports = router;