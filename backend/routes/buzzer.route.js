const express = require("express")
const router = express.Router();
const buzzerController = require("../controllers/buzzer.controller")

router.post('/add', buzzerController.createBuzzerPress)
router.get('/all_buzzers', buzzerController.getBuzzerQueue)

module.exports = router;