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
			type: DataTypes.ENUM(
				"java",
				"py",
				"cpp",
				"c",
				"go",
				"cs",
				"js"
			),
			allowNull: false,
		},
		checkerLang: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM("HIDDEN", "LIVE", "PRACTICE"),
			allowNull: false,
		},
		point: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
	});

	Problem.associate = ({ Contest, Solution }) => {
		Problem.belongsTo(Contest);
		Problem.hasMany(Solution);
	};

	return Problem;
};
