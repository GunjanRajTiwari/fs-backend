module.exports = (sequalize, DataTypes) => {
	const Blog = sequalize.define("Blog", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});
	return Blog;
};
