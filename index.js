const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const runCode = require("./utils/runCode");
const authRoute = require("./routes/auth");
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

app.use("/auth", authRoute);
app.get("/", (req, res) => {
	res.send("Welcome to Fourspace API");
});

app.listen(8080, () => {
	console.log("Server running on 8080 ...");
});
