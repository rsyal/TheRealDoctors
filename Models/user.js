const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: false }, 
  specialty: { type: String, required: true },
  identification_id: {type: Number, required: true },
  role: { type: String, required: ture }, 
  created_dt: { type: Date, default: Date.now }
});

const User = mongoose.Models.User || mongoose.model("User", userSchema);

module.exports = User;