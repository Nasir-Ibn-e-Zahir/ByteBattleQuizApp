const express = require("express");
const router = express.Router();
const authContoller = require("../controllers/auth.controller")

router.post("/", authContoller.handleLogin)

module.exports = router;