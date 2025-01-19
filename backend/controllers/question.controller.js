const db = require("../models");

exports.createQuestion = async (req, res) => {
  try {
    const { question, option_a, option_b, option_c, option_d, correct_option } = req.body;
    
    // Validate the incoming data
    if (!question || !option_a || !option_b || !option_c || !option_d || !correct_option) {
      return res.status(400).json({ message: "All fields are required." });
    }
    
    // Insert the new question into the database
    await db.Question.create({
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_option
    });
    
    res.status(201).json({ message: "Question inserted successfully!" });
  } catch (error) {
    console.error("Error during question insertion:", error);
    res.status(500).json({ message: "Failed to insert question." });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const { count, rows } = await db.Question.findAndCountAll({});
    res.status(200).json({ count, questions: rows });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Failed to fetch all questions from the database." });
  }
};

exports.destroyQuestion = async (req, res) => {
  const { id } = req.params;
  
  try {
    const question = await db.Question.findByPk(id);
    
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    // Delete the question from the database
    await question.destroy();
    
    res.status(200).json({ message: "Question deleted successfully." });
  } catch (error) {
    console.error("Error during question deletion:", error);
    res.status(500).json({ error: "Failed to delete question." });
  }
};
