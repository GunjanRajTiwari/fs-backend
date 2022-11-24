const router = require("express").Router();

router.get("/", adminLogin);
router.get("/contests", getContests);
router.get("/problems", getProblems);
router.post("/contests", addContest);
router.post("/problems", addProblem);
router.get("/contest/:id", viewContest);
router.get("/problem/:id", viewProblem);
