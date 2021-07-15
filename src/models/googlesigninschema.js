const mongoose = require('mongoose')

const googleauthSchema = new mongoose.Schema({
googleId: {
    type: String,
    required: true
},
firstname : {
    type:String,
    required:true,
},
lastname : {
    type:String,
    required:true,
},
displayname: {
    type:String,
    required:true,
},
email: {
    type:String,
    required:true,
},
image: {
    type:String,
    required:true,
}

})

module.exports = mongoose.model('Googleuser',googleauthSchema)
