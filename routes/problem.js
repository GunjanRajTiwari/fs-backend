const problemController = require("../controllers/problemController");

const router = require("express").Router();

router.get("/", problemController.getAllProblems);
router.get("/:id", problemController.getProblem);
router.get("/:id/submit", problemController.submit);

module.exports = router;
