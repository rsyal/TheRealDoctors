const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogUserSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: false }, 
  user_id: {type: String, required: true },
  created_dt: { type: Date, default: Date.now }
});

const BlogUser = mongoose.Models.BlogUser || mongoose.model("BlogUser", blogUserSchema);

module.exports = BlogUser;