const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/testsite",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log("connection with database successful");
}).catch(() => {
    console.log("connection with database unsuccesful");
})