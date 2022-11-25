module.exports = (sequalize, DataTypes) => {
	const Problem = sequalize.define("Problem", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		testcase: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		checker: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM("HIDDEN", "LIVE", "PRACTICE"),
			allowNull: false,
		},
	});

	return Problem;
};
