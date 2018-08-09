'use strict';

const db = require('./Models');
const User = require('mongoose').model('User');
const passport = require('passport');
//const TwitterTokenStrategy = require('passport-twitter-token');
//const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const config = require('./config');

module.exports = function () {
    passport.use(new GoogleTokenStrategy({
            clientID: config.googleAuth.clientID,
            clientSecret: config.googleAuth.clientSecret
        },
        function (accessToken, refreshToken, profile, done) {
            User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
                return done(err, user);
            });
        }));
};
