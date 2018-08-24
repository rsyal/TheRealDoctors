const blogsRouter = require("express").Router();
const blogsController = require("../../Controllers/blogController");
const commentController = require("../../Controllers/commentController");

// routes for "/api/blogs"
blogsRouter
  .route("/")
  .get(blogsController.findAll)
  .post(blogsController.create);

// routes for "/api/blogs/query"
// blogsRouter
//   .route("/query/:query")
//   .get(blogsController.findAll);

// routes for "/api/blogs/:id"
blogsRouter
  .route("/:id")
  .get(blogsController.findById)
  .put(blogsController.update)
  .delete(blogsController.remove);

blogsRouter
  .route("/comment/:id")
  .post(commentController.create);

module.exports = blogsRouter;
