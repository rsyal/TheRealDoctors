const bloggersRouter = require("express").Router();
const bloggersController = require("../../Controllers/bloggerController");

// routes for "/api/bloggers"
bloggersRouter
  .route("/")
  .get(bloggersController.findAll)
  .post(bloggersController.create);

// routes for "/api/bloggers/:id"
bloggersRouter
  .route("/:id")
  .get(bloggersController.findById)
  .put(bloggersController.update)
  .delete(bloggersController.remove);

module.exports = bloggersRouter;
