module.exports = (sequalize, DataTypes) => {
	const Contest = sequalize.define("Contest", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		start: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		duration: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
		},
		type: {
			type: DataTypes.ENUM("DRIVE", "OFFROAD", "UNRATED", "OTHERS"),
			allowNull: false,
		},
	});

	return Contest;
};
