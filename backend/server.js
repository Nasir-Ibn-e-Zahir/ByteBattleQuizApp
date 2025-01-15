const express = require('express');
const app = express();
const port = 3000;
const db = require('./models')

app.get('/team/addteam',(req,res)=>{
    res.send('Welcome to Quiz App');
})

db.sequelize.sync().then(()=>{

    app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
})
}).catch((err)=>{
    console.log(err)
})




