const { User, Contest } = require("../models");

const getProfile = async (req, res) => {
	const username = req.params.username;
	const profile = await User.findOne({
		where: { username: username },
		attributes: ["id", "username", "name", "rating", "rank", "avatar"],
		include: { model: Contest, as: "contests" },
	});
	res.send(profile);
};

const updateUser = (req, res) => {};

module.exports = { getProfile, updateUser };
