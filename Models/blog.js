const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  blogger: {
    type: Schema.Types.ObjectId,
    ref: "Blogger"
  },
  topic: { type: String, required: true },
  content: { type: String, required: true },
  imageSrc: { type: String, required: false },
  created_dt: { type: Date, default: Date.now },
  comments: [
    {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
  ]
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

module.exports = Blog;
