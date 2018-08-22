const commentsRouter = require("express").Router();
//const blogsController = require("../../Controllers/blogController");
const commentsController = require("../../Controllers/commentController");

// routes for "/api/comments"
commentsRouter
  .route("/")
  .get(commentsController.findAll)
  .post(commentsController.create);

// routes for "/api/comments/query"
commentsRouter.route("/query/:query").get(commentsController.findAll);

// routes for "/api/comments/:id"
commentsRouter
  .route("/:id")
  .get(commentsController.findById)
  .put(commentsController.update)
  .delete(commentsController.remove);

//router.route("/comment/:id").post(commentController.create);

module.exports = commentsRouter;