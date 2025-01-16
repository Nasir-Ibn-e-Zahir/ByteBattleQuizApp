const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller")

router.post("/add", teamController.createTeam)

module.exports = router;