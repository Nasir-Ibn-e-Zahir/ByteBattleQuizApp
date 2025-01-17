const db = require("../models");

exports.createMatch = async (req,res) => {
    try{
        console.log(req.body);
        const  {match_name,match_type} = req.body;
        await db.Match.create({match_name,match_type})
        res.status(200).json({message: "Match added successfully"})
    }catch {
        res.status(404).json({message: "Some error occured in addition in match"})
    }
}