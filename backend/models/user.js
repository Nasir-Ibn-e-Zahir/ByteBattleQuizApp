module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allownull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allownull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allownull: false,
        },
        refresh_token: {
            type: DataTypes.STRING,
            allownull: true,
        },
    });
    return User;
};
