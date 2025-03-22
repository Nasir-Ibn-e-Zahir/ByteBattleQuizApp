const express = require('express');
const app = express();
const port = 3000;
const db = require('./models')
const buzzerRouter = require("./routes/buzzer.route")
const teamRouter = require("./routes/team.route")
const questionRouter = require('./routes/question.route')
const matchRouter = require('./routes/match.route')
const registerRouter = require("./routes/register.route")
const loginTouter = require("./routes/auth.route")
const refreshTokenRouter = require("./routes/refreshToken.route")
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true

}))

app.get('/', (req, res) => {
    res.send('Welcome to Quiz App');
})

// app.get('/team/addteam', (req, res) => {
//     res.send('Welcome to Quiz App');
// })
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/register", registerRouter)
app.use("/api/login", loginTouter)
app.use("/api/refresh_token", refreshTokenRouter)
app.use("/api/team", teamRouter)
app.use("/api/match", matchRouter)
app.use("/api/question", questionRouter)
app.use("/api/buzzer", buzzerRouter)
db.sequelize.sync().then(() => {

    app.listen(port, (req, res) => {
        console.log(`Server is running on port ${port}`);
    })
}).catch((err) => {
    console.log(err)
})




