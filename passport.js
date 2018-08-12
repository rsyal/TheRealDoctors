'use strict';

const db = require('./Models');
// const User = require('mongoose').model('User');
const Blogger = require('mongoose').model('Blogger');
const passport = require('passport');
//const TwitterTokenStrategy = require('passport-twitter-token');
//const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const config = require('./config');

module.exports = function () {
    passport.use(new GoogleTokenStrategy({
            clientID: config.googleAuth.clientID,
            clientSecret: config.googleAuth.clientSecret
            // callbackURL: config.googleAuth.callbackURL,
            // passReqToCallback: true
        },
        function (accessToken, refreshToken, profile, done) {
            Blogger.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
                return done(err, user);
            });
        }));
};
