module.exports = (sequalize, DataTypes) => {
	const User = sequalize.define("User", {
		username: {
			type: DataTypes.STRING(63),
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		avatar: {
			type: DataTypes.STRING,
			defaultValue: "./avatar.jpg",
		},
		rank: {
			type: DataTypes.ENUM(
				"ROOKIE",
				"VETERAN",
				"ELITE",
				"PRO",
				"MASTER",
				"GRANDMASTER",
				"LEGENDARY"
			),
			defaultValue: "ROOKIE",
		},
		rating: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
	});

	User.associate = ({ Contest, Solution }) => {
		User.belongsToMany(Contest, {
			through: "Register",
		});
		User.hasMany(Solution);
	};

	return User;
};
