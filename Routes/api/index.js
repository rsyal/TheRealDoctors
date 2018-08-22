const router = require("express").Router();
const blogsRouter = require("./blogs");
const bloggersRouter = require("./bloggers");
const commentsRouter = require("./comments");

router.use("/blogs", blogsRouter);
router.use("/bloggers", bloggersRouter);
router.use("/comments", commentsRouter);

module.exports = router;