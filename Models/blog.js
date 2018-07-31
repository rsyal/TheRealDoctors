const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: false }, 
  blog_by: {type: String, required: true },
  blog_date: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;