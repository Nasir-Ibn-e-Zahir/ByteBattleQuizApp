const { DataTypes } = require("sequelize");
const { sequelize } = require(".");


module.exports = (sequelize,DataTypes)=>{
    const Match = sequelize.define(
        "Match",{
            match_name:{
                type:DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }
    )
    return Match;
}