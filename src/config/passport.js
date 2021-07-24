const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const express = require('express')
const jwt = require('jsonwebtoken')
const Googleuser = require('../models/googlesigninschema')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET ,
        callbackURL: '/auth/google/callback'
    },
    async(accessToken, refreshToken, profile, done) =>{
        const googleUser = {
            googleId: profile.id,
            displayname: profile.displayName,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            image: profile.photos[0].value
        }

        try {
            const user = await Googleuser.findOne({googleId:profile.id})
            if(user){
                done(null,user)
            }else{
                const user = await Googleuser.create(googleUser);
                done(null,user)
            }
        } catch (error) {
            console.log(error.message)
        }
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        Googleuser.findById(id, function(err, user) {
          done(err, user);
        });
      });
}