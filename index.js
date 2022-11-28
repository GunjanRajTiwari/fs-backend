const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const runCode = require("./utils/runCode");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const contestRoute = require("./routes/contest");
const db = require("./models");
const { checkLogin } = require("./middlewares/auth");
require("./utils/auth");

const app = express();
app.use(
	cookieSession({
		name: "session",
		keys: ["fourspace"],
		maxAge: 24 * 60 * 60 * 1000,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

// ... Routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/contests", contestRoute);
// app.use("/problems", problemRoute);
// app.use("/sollutions", sollutionRoute);

app.get("/", checkLogin, (req, res) => {
	res.send(req.user);
});

db.sequelize.sync().then(() => {
	console.log("Database synced ...");
	app.listen(8080, () => {
		console.log("Server running on 8080 ...");
	});
});
