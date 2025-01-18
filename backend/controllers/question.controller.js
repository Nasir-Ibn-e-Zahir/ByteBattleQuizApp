const { where } = require("sequelize")
const db = require("../models")

exports.createQuestion = async (req, res) => {
  try {
    console.log(req.body)
    const { question, option_a, option_b, option_c, option_d, correct_option } = req.body
    await db.Question.create({
      question, option_a, option_b, option_c, option_d, correct_option
    })
    res.status(200).json({ message: "Question inserted successfully..!" })
  } catch (e) {
    console.log("Some error occurred during question insertion...", e)
    res.status(400).json({ message: "Question is not inserted successfully...!" })
  }
}

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await db.Question.findAndCountAll({})
    res.status(200).json({ questions })
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all questions from database." })
  }
}


exports.destroyQuestion = async (req, res) => {
  const questionId = req.params.id;

  try {
    const question = await db.Question.findByPk(questionId);

    if (question) {
      await question.destroy({
        where: {
          id: questionId
        }
      })

      res.status(200).json({ message: "Question deleted successfully." })
    } else {
      res.status(404).json({ message: "Question not find." })
    }

  } catch (error) {
    console.error("Failed to delete question.")

    res.status(500).json({ error: "Failed to delete question." })
  }


}
