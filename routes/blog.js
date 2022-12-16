const router = require("express").Router();
const blogController = require("../controllers/blogController");

// get blog list
router.get("/", blogController.getBlogs);

module.exports = router;
