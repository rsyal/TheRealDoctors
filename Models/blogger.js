const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloggerSchema = new Schema({
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  // password: {
  //   type: String,
  //   trim: true,
  //   required: "Password is Required",
  //   validate: [
  //     function(input) {
  //       return input.length >= 6;
  //     },
  //     "Password should be longer."
  //   ]
  // },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  specialty: { type: String, required: true },
  npmNumber: { type: String, required: false },
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
