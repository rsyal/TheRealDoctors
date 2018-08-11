const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Blogger = require("../Models/blogger");

const userSchema = new Schema({
    blogger: {
        type: Schema.Types.ObjectId,
        ref: "Blogger"
    }, 
    fullName: {
        type: String, required: true,
        trim: true
    },
    email: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    googleProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    }
});

userSchema.set('toJSON', {getters: true, virtuals: true});

userSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
    const that = this;
    return this.findOne({
        'googleProvider.id': profile.id
    }, function(err, user) {

        console.log('blogger ', blogger)
        console.log('blogger ', blogger._id, blogger.email)
        // saved logged in user. save blogger info for this user in localStorage
        localStorage.setItem('blogger', JSON.stringify(blogger));
        console.log('localStorage ', localStorage);

        sessionStorage.setItem('blogger', JSON.stringify(blogger));
        console.log('sessionStorage ', sessionStorage);
        
        // no user was found, lets create a new one
        if (!user) {
            const newUser = new that({
                blogger: null, 
                fullName: profile.displayName,
                email: profile.emails[0].value,
                googleProvider: {
                    id: profile.id,
                    token: accessToken
                }
            });

            console.log('new user ', newUser)

           

            // update blogger._id to newUser
            newUser.blogger = blogger1._id;

            newUser.save(function(error, savedUser) {
                if (error) {
                    console.log(error);
                }

                
                return cb(error, savedUser);
            });
        } else {
            return cb(err, user);
        }
    });
  };

    const User = mongoose.models.User || mongoose.model("User", userSchema);

    module.exports = User;
    
