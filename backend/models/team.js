const { DataTypes } = require("sequelize");
const { sequelize } = require(".");


module.exports = (sequelize,DataTypes)=>{
    const Team = sequelize.define(
        "Team",{
            id:{
                type:DataTypes.INTEGER,
                allowNull:false,
                autoIncrement: true,
                primaryKey: true
            },
            team_name:{
                type:DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description:{
                type:DataTypes.STRING,
                allowNull: false
            }
        }
    )

    Team.associate = (models) => {
        Team.hasMany(models.Team_Match,{
            foreignKey:"team_id",
            as:"rounds"
        })
    }

    return Team;
}