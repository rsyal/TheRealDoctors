const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: false }, 
  user_id: {type: String, required: true },
  created_dt: { type: Date, default: Date.now }
});

const Blog = mongoose.Models.Blog || mongoose.model("Blog", blogSchema);

module.exports = Blog;