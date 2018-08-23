const db = require("../Models");

// Defining methods for the BlogController
module.exports = {
  findAll: (req, res) => {
    db.Blog.find(req.query)
      .populate("blogger")
      .populate("comments")
      .sort({ created_dt: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.Status(422).json(err));
  },
  findById: function(req, res) {
    db.Blog.findById(req.params.id)
      .populate("blogger")
      .populate("comments")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Blog.create(req.body)
      .then(dbBlog =>
        db.Blogger.findOneAndUpdate(
          {_id:req.body.bloggerId},
          { $push: { blogs: dbBlog._id } },
          { new: true }
        )
      )
      // .then(dbBlogger => db.Blog.findOneAndUpdate({ _id: dbBlogger.blogs.sort(created_dt)}))
      .then(dbBlogger => res.json(dbBlogger))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Blog.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Blog.findById(req.params.id)
      .populate('blogger')
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  }
  // remove: function(req, res) {
  //   db.Blog.findById(req.params.id)
  //     .then(dbBlog => dbBlog.remove())
  //     .then(dbBlog => {
  //       dbBlogger.findById(dbBlog._id, function(err, blogger) {
  //         if(err) {
  //           return console.log(err);
  //         }
  //         blogger.blogs.pull(req.params.id);  //  blogger.blogs.id(req.params.id).remove();
  //         blogger.save();
  //       })
  //     })
  //     .then(dbBlogger => res.json(dbBlogger))
  //     .catch(err => res.status(422).json(err));
  // }
};
