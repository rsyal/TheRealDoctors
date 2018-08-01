const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  blog_id: { type: Number, required: true },
  created_dt: { type: Date, default: Date.now }
});

const Comment = mongoose.Models.Comment || mongoose.model("Comment", commentSchema);

module.exports = Comment;