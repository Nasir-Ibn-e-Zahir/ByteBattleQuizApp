const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller")

router.post("/add", teamController.createTeam)
router.get("/all_teams", teamController.getAllTeams)
router.delete("/:id", teamController.destroyTeam)
router.get("/:id/edit", teamController.editTeam)
router.put("/:id", teamController.updateTeam)

module.exports = router;