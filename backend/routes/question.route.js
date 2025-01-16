const express = require('express')
const router = express.Router()
const QuestionController = require("../controllers/question.controller")

router.post('/add',QuestionController.createQuestion)


module.exports = router