require('dotenv').config()
const express  = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const app = express();
const flash = require('connect-flash')
const session = require('express-session')
const careerroute = require('./src/routes/careerform')
const contactroute = require('./src/routes/contactform')
const registerroute = require('./src/routes/registration')
const loginroute = require('./src/routes/login')

require('./src/database/connect')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))


app.use('/careers', careerroute)
app.use('/contactUs', contactroute)
app.use('/register', registerroute)
app.use('/login', loginroute)

/*express-session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

//connect-flash middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});*/

app.set('view engine', 'ejs')
app.get('', (req,res)=>{
    res.render('index')
})

app.get('/home', (req,res)=>{
    res.render('index')
})

app.get('/contactUs', (req,res)=>{
    res.render('contact')
})

app.get('/careers', (req,res)=>{
    res.render('careers')
})

app.get('/blogs', (req,res)=>{
    res.render('blogs')
})

app.get('/courses', (req,res)=>{
    res.render('courseslist')
})

app.get('/login', (req,res)=>{
    res.render('login')
})

app.get('/register', (req,res)=>{
    res.render('register')
})

app.get('/t&c', (req,res)=>{
    res.render('t&c')
})

app.use(express.static(path.join(__dirname,"./public")))

app.listen(8080, () =>{
    console.log('server is running')
})