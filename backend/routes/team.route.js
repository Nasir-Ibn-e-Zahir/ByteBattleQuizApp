const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller")

router.post("/", teamController.createTeam)

module.exports = router;