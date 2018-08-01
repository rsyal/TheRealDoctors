const router = require("express").Router();
const blogsRouter = require("./blogs");
const bloggersRouter = require("./bloggers");

router.use("/blogs", blogsRouter);
router.use("/bloggers", bloggersRouter);

module.exports = router;