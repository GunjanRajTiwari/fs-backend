const problemController = require("../controllers/problemController");
const { checkLogin } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", problemController.getAllProblems);
router.get("/:id", checkLogin, problemController.getProblem);
router.post("/:id/submit", checkLogin, problemController.submit);

module.exports = router;
