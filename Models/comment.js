const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog"
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  created_dt: { type: Date, default: Date.now }
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

module.exports = Comment;