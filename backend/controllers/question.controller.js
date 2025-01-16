const { LuRotateCwSquare } = require("react-icons/lu")
const db = require("../models")

exports.createQuestion = async (req,res)=>{
    try{
      console.log(req.body)
      const {question,option_a,option_b,option_c,option_d,correct_option} = req.body
    await db.Question.create({
        question,option_a,option_b,option_c,option_d,correct_option
    })
    res.status(200).json({message:"Question inserted successfully..!"})
    }catch(e){
         console.log("Some error occurred during question insertion...",e)
         res.status(400).json({message:"Question is not inserted successfully...!"})
    }
}