const userController = require("../controllers/userController");

const router = require("express").Router();

router.get("/:username", userController.getProfile);

module.exports = router;
