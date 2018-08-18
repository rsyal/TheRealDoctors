const router = require("express").Router();
const blogsController = require("../../Controllers/blogController");

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

module.exports = router;
