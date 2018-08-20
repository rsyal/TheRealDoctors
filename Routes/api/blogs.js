const router = require("express").Router();
const blogsController = require("../../Controllers/blogController");
const commentController = require("../../Controllers/commentController");

// routes for "/api/blogs"
router
  .route("/")
  .get(blogsController.findAll)
  .post(blogsController.create);

// routes for "/api/blogs/query"
router.route("/query/:query").get(blogsController.findAll);

// routes for "/api/blogs/:id"
router
  .route("/:id")
  .get(blogsController.findById)
  .put(blogsController.update)
  .delete(blogsController.remove);

router.route("/comment/:id").post(commentController.create);

module.exports = router;
