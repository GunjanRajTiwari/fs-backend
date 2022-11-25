module.exports = (sequalize, DataTypes) => {
	const Solution = sequalize.define("Solution", {
		language: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM(
				"PENDING",
				"ACCEPTED",
				"WRONG",
				"TLE",
				"MLE",
				"CE",
				"RE"
			),
			allowNull: false,
		},
		time: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
		},
		code: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		inContest: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	});

	return Solution;
};
