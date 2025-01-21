const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller")

router.post("/add", teamController.createTeam)
router.get("/all_teams", teamController.getAllTeams)
router.get("/:id", teamController.destroyTeam)

module.exports = router;