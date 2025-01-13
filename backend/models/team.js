const { DataTypes } = require("sequelize");
const { sequelize } = require(".");


module.exports = (sequelize,DataTypes)=>{
    const Team = sequelize.define(
        "Team",{
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
    return Team;
}