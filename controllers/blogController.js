const { Blog } = require("../models");

const getBlogs = async (req, res) => {
	const result = await Blog.findAll({
		order: [["updatedAt", "desc"]],
		limit: 10,
	});
	res.send({ data: result });
};

module.exports = {
	getBlogs,
};
