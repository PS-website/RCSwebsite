const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
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

const contactform = new mongoose.model("contact_requests", contactSchema)

module.exports = contactform;
