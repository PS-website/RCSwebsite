const jwt = require('jsonwebtoken')

const Register = require("../models/registerschema");

const cookieverify = async(req,res,next) =>{
    try {
        const cookie = req.cookies.mycookie;
        const verifyUser = jwt.verify(cookie, process.env.SECRET_KEY)
        const profiledata = await Register.findOne({_id:verifyUser._id})
        req.profiledata = profiledata
        req.cookie = cookie
        next();
    }catch (error) {
        req.flash('alert-danger','Login to access profile!!')
        res.redirect('/login')
        //res.status(401).send(error.message)
    }
}

module.exports = cookieverify;