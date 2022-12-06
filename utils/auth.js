const passport = require("passport");
const { User } = require("../models");

require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
		},
		async function (accessToken, refreshToken, profile, done) {
			console.log(profile);
			try {
				const [user, created] = await User.findOrCreate({
					where: {
						email: profile._json.email,
					},
					defaults: {
						name: profile._json.name,
						username: profile._json.sub,
						avatar: profile._json.picture,
						email: profile._json.email,
					},
				});
				done(null, user.dataValues);
			} catch (e) {
				done(e, null);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findOne({ where: { id: id } });
	if (user === null) done("Not found", null);
	done(null, user);
});
