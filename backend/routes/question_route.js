const express = require('express')
const QuestionRouter = express()

QuestionRouter.get('/',(req,res)=>{
    res.send("Questions Loaded Successfully")
})
QuestionRouter.get('/home',(req,res)=>{
    res.send("Questions Loaded Successfully")
})

export default QuestionRouter;