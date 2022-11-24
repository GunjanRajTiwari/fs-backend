const passport = require("passport");

const router = require("express").Router();
const CLIENT_URL = "http://localhost:3000";

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile"] })
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: CLIENT_URL,
		failureRedirect: CLIENT_URL,
	})
);

// router.get("/login/success", (req, res) => {
// 	res.json(req.user);
// });

// router.get("/login/failed", (req, res) => {
// 	res.json({ error: "Failed to login." });
// });

router.get("/user", (req, res) => {
	res.send(req.user);
});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(CLIENT_URL);
});

module.exports = router;
