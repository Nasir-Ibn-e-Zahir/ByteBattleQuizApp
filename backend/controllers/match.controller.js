const { where } = require("sequelize");
const db = require("../models");

exports.createMatch = async (req, res) => {
    console.log(req.body);
    const { match_name, match_type, team_ids } = req.body;

    if (!match_name || !match_type || !Array.isArray(team_ids) || team_ids.length === 0) {
        return res.status(400).json({ error: "Invalid input data. Ensure all fields are provided." })
    }
    try {

        const existingTeams = await db.Team.findAll({ where: { id: team_ids } })

        if (existingTeams.length !== team_ids.length) {
            return res.status(400).json({ error: "Some teams do not exist in the database." })
        }

        const newMatch = await db.Match.create({ match_name, match_type });

        const teamMatchEntries = team_ids.map((team_id) => ({
            team_id,
            match_id: newMatch.id,
            score: 0,
        }))

        await db.Team_Match.bulkCreate(teamMatchEntries);

        res.status(200).json({ message: "Match added successfully", match: newMatch })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Some error occurred while adding the match" })
    }
}