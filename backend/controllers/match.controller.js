const { where } = require("sequelize");
const db = require("../models");

exports.createMatch = async (req, res) => {
    const { match_name, match_type, team_ids } = req.body;

    // Validate input data
    if (!match_name || !match_type || !Array.isArray(team_ids) || team_ids.length === 0) {
        return res.status(400).json({ error: "Invalid input data. Ensure all fields are provided." });
    }

    try {
        // Check if the teams exist in the database
        const existingTeams = await db.Team.findAll({ where: { id: team_ids } });

        // If some teams don't exist, return error
        if (existingTeams.length !== team_ids.length) {
            return res.status(400).json({ error: "Some teams do not exist in the database." });
        }

        // Create a new match record
        const newMatch = await db.Match.create({ match_name, match_type });

        // Create entries in the Team_Match table for each team participating in the match
        const teamMatchEntries = team_ids.map((team_id) => ({
            team_id,
            match_id: newMatch.id,
            score: 0,
        }));

        // Insert the Team_Match entries in bulk
        await db.Team_Match.bulkCreate(teamMatchEntries);

        // Return success response with the created match data
        return res.status(201).json({ message: "Match added successfully.", match: newMatch });
    } catch (error) {
        console.error("Error occurred during match creation:", error);
        return res.status(500).json({ error: "An error occurred while adding the match." });
    }
};

exports.destroyMatch = async (req, res) => {
    const matchId = req.params.id;

    try {
        // Find the match by ID
        const match = await db.Match.findByPk(matchId);

        // If match doesn't exist, return error
        if (!match) {
            return res.status(404).json({ error: "Match not found." });
        }

        // Delete associated team match entries
        await db.Team_Match.destroy({
            where: { match_id: matchId },
        });

        // Delete the match itself
        await match.destroy();

        // Return success response
        return res.status(200).json({ message: "Match deleted successfully." });
    } catch (error) {
        console.error(`Failed to delete match with id ${matchId}:`, error);
        return res.status(500).json({ error: "Failed to delete match." });
    }
}

exports.editMatch = async (req, res) => {
    const matchId = req.params.id;

    try {
        const match = await db.Match.findByPk(matchId, {
            include: {
                model: db.Team_Match,
                as: "rounds",
                include: {
                    model: db.Team,
                    as: "team",
                },
            },
        });

        if (!match) {
            return res.status(404).json({ error: "Match not found." });
        }

        res.status(200).json({ match });
    } catch (error) {
        console.error(`Failed to retrieve match with id ${matchId}:`, error);
        res.status(500).json({ error: "Failed to retrieve match." });
    }
};


exports.updateMatch = async (req, res) => {
    const matchId = req.params.id;
    const { match_name, match_type, team_ids } = req.body;

    try {
        const match = await db.Match.findByPk(matchId);

        if (!match) {
            return res.status(404).json({ error: "Match not found." });
        }

        // Update match details
        if (match_name || match_type) {
            await match.update({ match_name, match_type });
        }

        if (team_ids && Array.isArray(team_ids)) {
            // Validate team IDs
            const existingTeams = await db.Team.findAll({ where: { id: team_ids } });
            if (existingTeams.length !== team_ids.length) {
                return res.status(400).json({ error: "Some teams do not exist in the database." });
            }

            // Remove old associations
            await db.Team_Match.destroy({ where: { match_id: matchId } });

            // Create new associations
            const teamMatchEntries = team_ids.map((team_id) => ({
                team_id,
                match_id: matchId,
                score: 0,
            }));
            await db.Team_Match.bulkCreate(teamMatchEntries);
        }

        res.status(200).json({ message: "Match updated successfully." });
    } catch (error) {
        console.error(`Failed to update match with id ${matchId}:`, error);
        res.status(500).json({ error: "Failed to update match." });
    }
};