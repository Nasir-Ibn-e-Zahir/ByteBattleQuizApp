const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller")

router.post("/add", teamController.createTeam)
router.get("/get_all", teamController.getAllTeams)

module.exports = router;