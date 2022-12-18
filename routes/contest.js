const router = require("express").Router();
const contestController = require("../controllers/contestController");
const { checkLogin } = require("../middlewares/auth");

router.get("/", contestController.getNewContests);
router.get("/past", contestController.getPastContests);
router.get("/:id", checkLogin, contestController.getContest);
// router.get("/:id", viewContest);
router.post("/:id/register", checkLogin, contestController.register);
router.get("/:id/leaderboard", contestController.getLeaderboard);

module.exports = router;
