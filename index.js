const path = require("path");
const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const AdminBro = require("admin-bro");
const AdminBroSequelize = require("@admin-bro/sequelize");
const AdminBroExpress = require("@admin-bro/express");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const contestRoute = require("./routes/contest");
const problemRoute = require("./routes/problem");

const db = require("./models");

const { checkLogin, checkAdmin } = require("./middlewares/auth");
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
app.use(express.static("build"));

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

// ... Routes
app.use("/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/contests", contestRoute);
app.use("/api/problems", problemRoute);
// app.use("/sollutions", sollutionRoute);

app.get("/api/leaderboard", async (req, res) => {
	try {
		// const page = req.query.page;
		// if (!page) page = 1;
		const leaderboard = await db.User.findAll({
			attributes: [
				"username",
				"name",
				"rank",
				"rating",
				[
					db.Sequelize.literal(
						"(RANK() OVER (ORDER BY rating DESC))"
					),
					"place",
				],
			],
			order: [
				["rating", "DESC"],
				["createdAt", "ASC"],
			],
		});

		if (!req.user) return res.send({ data: { leaderboard } });

		const me = leaderboard.find(
			user => user.username === req.user.username
		);

		res.send({ data: { me, leaderboard } });
	} catch (error) {
		res.send({ error });
	}
});

const port = process.env.PORT || 8080;
db.sequelize.sync().then(() => {
	console.log("Database synced ...");
	app.listen(port, () => {
		console.log("Server running ...");

		AdminBro.registerAdapter(AdminBroSequelize);
		const adminBro = new AdminBro({
			rootPath: "/admin",
			resources: [
				{ resource: db.Contest },
				{ resource: db.Problem },
			],
			branding: {
				companyName: "Four Space",
			},
		});

		const adminRouter = AdminBroExpress.buildRouter(adminBro);

		app.use(adminBro.options.rootPath, checkAdmin, adminRouter);
	});
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "build"));
});
