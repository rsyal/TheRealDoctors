const router = require("express").Router();
const blogRoutes = require("./blogs");

router.use("/blogs", blogRoutes);

module.exports = router;