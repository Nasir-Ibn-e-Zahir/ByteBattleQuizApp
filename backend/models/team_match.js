const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Team_Match = sequelize.define(
    "Team_Match",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Teams",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      match_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Matches",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "Team_Matches",
      timestamps: true,
    }
  );

  Team_Match.associate = (models) => {
    Team_Match.belongsTo(models.Team, {
      foreignKey: "team_id",
      as: "team",
    });
    Team_Match.belongsTo(models.Match, {
      foreignKey: "match_id",
      as: "match",
    });
  };

  return Team_Match;
};
