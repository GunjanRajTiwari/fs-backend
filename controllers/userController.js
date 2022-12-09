const { User, Contest, Register } = require("../models");

const getProfile = async (req, res) => {
	const username = req.params.username;
	try {
		const profile = await User.findOne({
			where: { username: username },
			attributes: [
				"id",
				"username",
				"name",
				"rating",
				"rank",
				"avatar",
			],
			include: [
				{
					model: Contest,
					attributes: ["id", "title", "start"],
				},
			],
		});
		res.send({ data: profile });
	} catch (error) {
		res.send({ error });
	}
};

const updateUser = (req, res) => {};

module.exports = { getProfile, updateUser };
