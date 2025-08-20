
const express = require('express');
const router = express.Router();
const {addGoal,getGoals} = require('../controllers/goalController');
const { route } = require('./userRoutes');

router.post('/goals',addGoal);
router.get('/goals/:userId',getGoals);

module.exports = router;