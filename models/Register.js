module.exports = (sequalize, DataTypes) => {
	const Register = sequalize.define("Register", {
		submission: {
			type: DataTypes.INTEGER(4),
			defaultValue: 0,
		},
		solved: {
			type: DataTypes.INTEGER(4),
			defaultValue: 0,
		},
		timePenalty: {
			type: DataTypes.INTEGER(4),
			defaultValue: 0,
		},
		score: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		change: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
	});

	return Register;
};
