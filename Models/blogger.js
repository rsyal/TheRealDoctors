const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloggerSchema = new Schema({
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password should be longer."
    ]
  },
  first_name: { type: String, required: true },
  last_name: { type: String, required: false }, 
  specialty: { type: String, required: true },
  identification_id: {type: Number, required: true },
  role: { type: String, required: true }, 
  created_dt: { type: Date, default: Date.now }
  // blogs: [
  //   type:  Schema.Types.ObjectId,
  //   ref: "Blog"
  // ]
});

const Blogger = mongoose.model("Blogger", bloggerSchema);

module.exports = Blogger;