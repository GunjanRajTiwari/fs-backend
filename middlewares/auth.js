const admins = ["im.gunjan1@gmail.com"];

const checkLogin = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ error: "Unauthorized" });
	}
	next();
};

const checkAdmin = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ error: "Unauthorized" });
	}
	if (!admins.includes(req.user.email)) next();
};

module.exports = { checkAdmin, checkLogin };
