const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_CONNECTION,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log("connection with database successful");
}).catch(() => {
    console.log("connection with database unsuccesful");
})