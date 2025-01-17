const { where } = require("sequelize");
const db = require("../models");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
        return res.status(400).json({ message: "All fields are required." });

    const duplicate = await db.User.findOne({
        where: {
            [db.Sequelize.Op.or]: [{ email: email }, { username: username }],
        },
    });

    if (duplicate)
        return res.status(409).json({ message: "User already exists." });

    try {
        const hashPwd = await bcrypt.hash(password, 10);
        const user = await db.User.create({
            username,
            email,
            password: hashPwd,
        });
        res.status(201).json({ message: `User ${user.username} added.` });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { handleNewUser };
