require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const flash = require('connect-flash')

const registerSchema = new mongoose.Schema({
firstname : {
    type:String,
    required:true,
},
lastname : {
    type:String,
    required:true,
},
emailaddress: {
    type:String,
    required:true,
    unique:true
},
password : {
    type:String,
    required:true,
},
status: {
    type: Boolean
  },
confirmationCode: { 
    type: String, 
 },
 tokens:[{
    token:{
        type:String,
        required:true
    }
}]

})

//generating tokens
registerSchema.methods.generateAuthToken = async function(){
    try {
        const generatedtoken = jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:generatedtoken})
        await this.save();
        return generatedtoken;
    } catch (error) {
        req.flash('alert-danger','Something went wrong!!Try again..')
        return res.redirect('/home')
    }
}

//Hashing passwords
registerSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

// creating collection

const register = new mongoose.model("User_data", registerSchema)

module.exports = register;
