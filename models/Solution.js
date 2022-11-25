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
			type: DataTypes.Integer(4),
			allowNull: false,
		},
	});

	return Solution;
};
