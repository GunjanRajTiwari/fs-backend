module.exports = (sequalize, DataTypes) => {
	const User = sequalize.define("User", {
		username: {
			type: DataTypes.STRING,
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
	});

	return User;
};
