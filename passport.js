const db = require('./Models');
const User = require('mongoose').model('User');
//const Blogger = require('mongoose').model('Blogger');
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
                db.Blogger.findOneAndUpdate({email: user.email}, {user: user._id})
                    .then(blogger => console.log('blogger updated with user._id \n', blogger))
                    .catch(err => console.log('User model ', err));
                return done(err, user);
            });
        })
    );
};
