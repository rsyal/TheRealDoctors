const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloggerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  email: {
    type: String, default: null,//required: true,
    //unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid e-mail address"]
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

const Blogger = mongoose.models.Blogger || mongoose.model("Blogger", bloggerSchema);

module.exports = Blogger;
