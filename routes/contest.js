const router = require("express").Router();
const contestController = require("../controllers/contestController");
const { checkLogin } = require("../middlewares/auth");

router.get("/", contestController.getNewContests);
router.get("/past", contestController.getPastContests);
router.get("/:id", checkLogin, contestController.getContest);
// router.get("/:id", viewContest);
router.get("/:id/register", checkLogin, contestController.register);
// router.get("/:id/leaderboard", getContestLeaderboard);

module.exports = router;
