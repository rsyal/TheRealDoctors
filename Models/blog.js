const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bloggerSchema = require('mongoose').model('Blogger').schema;
const blogger = require('./blogger').Blogger;
const db = require('../Models');

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

blogSchema.post('remove', function(blogRemoved, next){
  //this.model('Blogger').remove({blog: this._id}, next);
  const blogId = blogRemoved._id;
  console.log('blog remove hook ', blogId);
  console.log('db ', db);
  console.log('db.Blogger ', db.Blogger);
  console.log('this.blogger._id ', this.blogger._id);
  console.log('this.blogger.data.blogs ', this.blogger.data.blogs);
  console.log('this.blogger.data[0].blogs ', this.blogger.data[0].blogs);
  // return db.Blogger
  //   .findOneById(this.blogger._id)
  //   .then(blogger => blogger.data[0].blogs.remove(this._id))
  //   .catch(err => console.log(err));
  return next();
})

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

module.exports = Blog;
