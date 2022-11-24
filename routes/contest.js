const router = require("express").Router();

router.get("/contests/", getContests);
router.get("/contests/:id", viewContest);
router.get("/contests/:id/register", registerToContest);
router.get("/contests/:id/leaderboard", getContestLeaderboard);
