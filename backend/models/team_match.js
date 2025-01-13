const { DataTypes } = require("sequelize");
const { sequelize } = require(".");


module.exports = (sequelize,DataTypes)=>{
    const Team_Match = sequelize.define(
        "Team_Match",{
            team_id:{
                type:DataTypes.INT,
                allowNull: false,
                unique: true
            },
            match_id:{
                type:DataTypes.INT,
                allowNull: false,
                unique: true
            },
            score:{
                type:DataTypes.INT,
            },
            
        }
    )
    return Team_Match;
}