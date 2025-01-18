const express = require('express')
const router = express.Router()
const QuestionController = require("../controllers/question.controller")

router.post('/add', QuestionController.createQuestion)
router.get('/all_questions', QuestionController.getAllQuestions)
router.delete('/:id', QuestionController.destroyQuestion)


module.exports = router