const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName: {
        type: String, required: true,
        trim: true
    },
    email: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    googleId: {
        type: String, required: true,
        trim: true
    }, 
    accessToken: {
        type: String, required: true,
        trim: true
    },
    created_date: {
        type: Date, 
        default: Date.now()
    }
    // googleProvider: {
    //     type: {
    //         id: String,
    //         token: String
    //     },
    //     select: false
    // }
});

userSchema.set('toJSON', {getters: true, virtuals: true});

userSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
    const that = this;
    return this.findOne({
        'googleId': profile.id
    }, function(err, user) {
        // no user was found, lets create a new one
        if (!user) {
            const newUser = new that({
                displayName: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                accessToken: accessToken
                // googleProvider: {
                //     id: profile.id,
                //     token: accessToken
                // }
            });

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
    
