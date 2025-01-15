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