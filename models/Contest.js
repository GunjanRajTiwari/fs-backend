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
		end: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		type: {
			type: DataTypes.ENUM("DRIVE", "OFFROAD", "UNRATED", "OTHERS"),
			allowNull: false,
		},
	});

	Contest.associate = ({ User, Problem }) => {
		Contest.belongsToMany(User, { through: "Register" });
		Contest.hasMany(Problem);
	};

	return Contest;
};
