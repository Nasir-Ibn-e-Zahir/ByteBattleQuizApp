const express = require('express');
const app = express();
const port = 3000;
const db = require('./models')
const teamRouter = require("./routes/team.route")
const bodyParser = require('body-parser');

// app.get('/team/addteam', (req, res) => {
//     res.send('Welcome to Quiz App');
// })
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/team", teamRouter)

db.sequelize.sync().then(() => {

    app.listen(port, (req, res) => {
        console.log(`Server is running on port ${port}`);
    })
}).catch((err) => {
    console.log(err)
})




