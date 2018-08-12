const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloggerSchema = new Schema({
  email: {
    type: String, default: null,//required: true,
    //unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid e-mail address"]
  },
  fullName: {
    type: String, default: null,//required: true,
    trim: true
  },
  googleProvider: {
      type: {
          id: String,
          token: String
      },
      select: false,
      default: null
  },
  firstName: { type: String },
  lastName: { type: String },
  specialty: { type: String },
  npiNumber: { type: String },
  created_dt: { type: Date, default: Date.now() },
  blogs: [
    { 
      type:  Schema.Types.ObjectId,
      ref: "Blog"
    }
  ]
});

bloggerSchema.set('toJSON', {getters: true, virtuals: true});

bloggerSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
  const that = this;  
  return this.findOne({
      'googleProvider.id': profile.id
  }, function(err, blogger) { 
    if (blogger && blogger.fullName) {
      console.log("You should be all good.");
      return cb(err, blogger);
    }
    else if (blogger && !blogger.fullName) {
      console.log("Your google token needs to be inserted");
      const updated = {
        fullName: profile.displayName,
        //email: profile.emails[0].value,
        googleProvider: {
            id: profile.id,
            token: accessToken
        }
      };
      return this.findOneAndUpdate({
        'googleProvider': null,
        'email': profile.emails[0].value
      }, updated, function(error, updatedBlogger) {
          if (error) {
            console.log(error);
          }
          return cb(error, updatedBlogger);
          })
    }
    else if (!blogger) {
      console.log("You should signup first");
      return cb(err, blogger);
    }
    else {
      return cb(err, blogger);
    }
});
};

const Blogger = mongoose.models.Blogger || mongoose.model("Blogger", bloggerSchema);

module.exports = Blogger;
