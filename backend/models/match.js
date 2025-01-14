const { DataTypes } = require("sequelize");
const { sequelize } = require(".");


module.exports = (sequelize,DataTypes)=>{
    const Match = sequelize.define(
        "Match",{
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            match_name:{
                type:DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            match_type: {
                type:DataTypes.STRING,
                allowNull: false,
            }
        }
    )

    Match.associate = (models) => {
        Match.hasMany(models.Team_Match,{
            foreignKey:"match_id",
            as:"rounds"
        })
    }

    return Match;
}