const router = require("express").Router();
const blogController = require("../controllers/blogController");

router.get("/", blogController.getBlogs);

module.exports = router;
