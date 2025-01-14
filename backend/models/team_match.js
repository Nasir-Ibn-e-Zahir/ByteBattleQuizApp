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
          model: "Teams", // Ensure this matches the actual table name or model name
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      match_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Matches", // Ensure this matches the actual table name or model name
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Optional: set a default score
      },
    },
    {
      tableName: "Team_Matches",
      timestamps: true, // Adds createdAt and updatedAt columns
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
