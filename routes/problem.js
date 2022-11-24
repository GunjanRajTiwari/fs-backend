const router = require("express").Router();

router.get("/problems/:id", viewProblem);
router.get("/problems/:id", viewProblem);
router.get("/problems/:id/submissions", getProblemSubmissions);
