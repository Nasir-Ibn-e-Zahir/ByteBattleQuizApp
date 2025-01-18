const db = require("../models");


exports.createTeam = async (req, res) => {
    try {
        const { team_name, description } = req.body;

        const newTeam = await db.Team.create({
            team_name, description
        });

        res.status(200).json({ message: "Team added successfully!" })
    } catch (error) {
        console.log("Error saving team: ", error)
        res.status(500).json({ error: error.message })
    }
}

exports.getAllTeams = async (req, res) => {
    try {
        const teams = await db.Team.findAndCountAll({})
        res.status(200).json({ allTeams: teams.rows })
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch teams" })
    }
}

exports.destroyTeam = async (req, res) => {
    const teamId = req.params.id;

    try {

        const team = await db.Team.findByPk(teamId);

        if (team) {
            await db.Team_Match.destroy({
                where: {
                    team_id: teamId
                }
            })

            await team.destroy();

            res.status(200).json({ message: `Team ${team.team_name} deleted successfully.` })
        } else {
            res.status(404).json({ error: `Team not found.` })
        }

    } catch (error) {
        console.error("Failed to delete team")
        res.status(500).json({ error: `Failed to delete team ${teamId}.` })
    }

}