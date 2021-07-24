require('dotenv').config()
const express = require('express');
const path = require('path')
const router = express.Router();
const { getMaxListeners } = require('process');
const nodemailer = require('nodemailer');
const multer = require('multer')
const mongoose = require('mongoose')
const {GridFsStorage} = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const crypto = require('crypto')

const Careerform = require("../models/careeformschema")


router.get('/', (req, res) => {
    res.render('careers')
});

//gridfs
const conn = mongoose.createConnection(process.env.DATABASE_CONNECTION,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true
})

let gfs;
conn.once('open', () =>{
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('resumes')
})

//create storage

const Storage = new GridFsStorage({
  url: process.env.DATABASE_CONNECTION,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'resumes'
        };
        resolve(fileInfo);
      });
    });
  }
});
//careers form

//Using nodemailer and multer

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:process.env.EMAIL_ID,
      pass:process.env.PASSWORD
    } 
    });
  
  var fullname
  var emailadd
  var phonenumber
  var messageinfo
  var filename
  var readstream
  var emailmessage
  

  var upload = multer({
    storage: Storage
  }).single("resume"); 
  
 router.post('/', async(req,res) => {
    upload (req,res,function(err){
        if(err){
          console.log(err)  
          req.flash('alert-danger','something went wrong. Try again!!')
          res.redirect('/careers')
        }else{
            fullname = req.body.full_name,
            emailadd = req.body.email,
            phonenumber = req.body.phone,
            vacancyIn = req.body.course,
            messageinfo = req.body.message,
            filename = req.file.filename,
            readstream = gfs.createReadStream(filename);
            emailmessage = `
            <h2>New application!!</h2>
            <h3>Details:</h3>
            <ul>
              <li>Name:${fullname}</li>
              <li>email:${emailadd}</li>
              <li>phone:${phonenumber}</li>
              <li>Applied for:${vacancyIn}</li>
            </ul>
            <h4>Message</h4>
            <p>${messageinfo}</p>`
  
              var mailOptions = {
                from: 'rashivcloudsolutions@gmail.com',
                to: "admin@rashivcloudsolutions.com",
                subject:'Application for trainer vacancy',
                text:'Name:'+ fullname + 
                     'contact:'+ phonenumber + 
                    'message:'+ messageinfo,
                html: emailmessage,
                attachments: [
                  {
                    filename:filename,
                    contentType: req.file.contentType,
                    content: readstream
                  }
               ]
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  req.flash('alert-danger','Your form is not submitted.Try again!!')
                  return res.redirect('/careers')
                } else {

                  req.flash('alert-success','Your application is successfully submitted!!')
                  const vacancyRequests = new Careerform ({
                    fullname: fullname,
                    Contactnumber: phonenumber,
                    contactEmail: emailadd,
                    coursetype: vacancyIn,
                    messageAdded: messageinfo,
                  })
                  const dataentered = vacancyRequests.save();
                  gfs.remove({filename:filename,root:'resumes'}, function(err) {
                    if (err) 
                    console.log(err);
                    return res.redirect('/careers')
                  });

                }
              });
        }
    })
  })

  module.exports = router;