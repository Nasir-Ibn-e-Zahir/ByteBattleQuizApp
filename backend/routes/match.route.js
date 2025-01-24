const express = require("express")
const router = express.Router();
const matchcontroller = require("../controllers/match.controller")

router.post('/add', matchcontroller.createMatch)
router.delete('/:id', matchcontroller.destroyMatch)
router.get('/:id/edit', matchcontroller.editMatch)
router.put('/:id', matchcontroller.updateMatch)
router.get('/all_matches', matchcontroller.getAllMatches)
router.put('/:id/update_score', matchcontroller.updateScore)

module.exports = router;