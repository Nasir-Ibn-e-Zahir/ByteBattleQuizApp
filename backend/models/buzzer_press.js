module.exports = (sequelize, DataTypes) => {
    const BuzzerPress = sequelize.define('BuzzerPress', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        teamName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'processed'),
            defaultValue: 'pending'
        }
    });

    return BuzzerPress;
};