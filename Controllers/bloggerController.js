const db = require("../Models");

// Defining methods for the BlogController
module.exports = {
  findAll: (req, res) => {
    db.Blogger.find(req.query)
      .populate('blogs')
      .sort({ created_dt: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.Status(422).json(err));
  },
  findById: function(req, res) {
    db.Blogger.findById(req.params.id)
      .populate('blogs')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("blogger controller \n", req.body);
    db.Blogger.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Blogger.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Blogger.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
