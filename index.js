require('dotenv').config()
const express  = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express();
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const cookieparser = require('cookie-parser')

const careerroute = require('./src/routes/careerform')
const contactroute = require('./src/routes/contactform')
const registerroute = require('./src/routes/registration')
const loginroute = require('./src/routes/login')
const googleauthroute = require('./src/routes/auth')
const forgotpassroute = require('./src/routes/forgotpassword')
const resetpassroute = require('./src/routes/resetpassword')
const cookieverify = require('./src/routes/cookieverify')
const logoutroute = require('./src/routes/logout')
const profileroute = require('./src/routes/profile')

const PORT = process.env.PORT||8080;

require('./src/database/connect')

//passport config
require('./src/config/passport')(passport)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

//cookie-parser middleware
app.use(cookieparser());
//express-session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*60*24
    }
  }))

//passport middleware
  app.use(passport.initialize())
  app.use(passport.session())

//connect-flash middleware
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//routes
app.use('/careers', careerroute)
app.use('/contactUs', contactroute)
app.use('/register', registerroute)
app.use('/login', loginroute)
app.use('/auth', googleauthroute)
app.use('/forgotpassword', forgotpassroute)
app.use('/resetpassword', resetpassroute)
app.use('/logout', logoutroute)
app.use('/profile', profileroute)


//renders
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

app.get('/forgotpassword', (req,res) =>{
    res.render('forgotpassword')
})


//static files access
app.use(express.static(path.join(__dirname,"./public")))


//server connection
app.listen(PORT, () =>{
    console.log('server is running')
})