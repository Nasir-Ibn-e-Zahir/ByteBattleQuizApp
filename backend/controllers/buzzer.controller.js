const db = require('../models');
const { Op } = require('sequelize');

exports.createBuzzerPress = async (req, res) => {
    try {
        const buzzer = await db.BuzzerPress.create({
            teamName: req.body.teamName,
            timestamp: new Date()
        });

        res.status(201).json(buzzer);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getBuzzerQueue = async (req, res) => {
    try {
        const queue = await db.BuzzerPress.findAll({
            where: { status: 'pending' },
            order: [['timestamp', 'ASC']],
            limit: 100
        });

        res.json(queue);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};