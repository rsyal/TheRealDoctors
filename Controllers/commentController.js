const db = require("../Models");

// Defining methods for the commentController
module.exports = {

  findAll: (req, res) => {
    db.Comment
      .find(req.query)
      .populate('blog')
      .sort({date: -1})
      .then(dbModel => res.json(dbModel)) 
      .catch(err => res.Status(422).json(err));
  }, 
  findById: function(req, res) {
    db.Comment
      .findById(req.params.id)
      .populate('blog')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Comment
      .create(req.body)
      .then(dbComment => {
        return db.Blog.findOneAndUpdate(
          {_id:req.body.blogId}, 
          { $push: { comments: dbComment._id }},  
          { new: true } );
       })
      .then(dbBlog => res.json(dbBlog))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Comment
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Comment
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  
}