const router = require("express").Router();
const blogsController = require("../../Controllers/blogsController");

// routes for "/api/blogs"
router.routes("/")
  .get(blogsController.findAll)
  .post(blogsController.create);

// routes for "/api/blogs/:id"
router.routes("/:id")
  .get(blogsController.findById)
  .put(blogsController.update)
  .delete(blogsController.remove);

module.exports = router;