const mongoose = require('mongoose')

const careerSchema = new mongoose.Schema({
fullname : {
    type:String,
    required:true,
},
contactEmail: {
    type:String,
    required:true,
},
contactnumber : {
    type:String,
},
coursetype: {
    type:String,
},
messageAdded: { 
    type: String, 
 },

})


// creating collection

const careerform = new mongoose.model("career_applications", careerSchema)

module.exports = careerform;
