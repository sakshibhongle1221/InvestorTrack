const express = require('express');
const router = express.Router();

const {addBudget,getBudgets} = require('../controllers/budgetController');

router.post('/budgets',addBudget);
router.get('/budgets/:userId',getBudgets);

module.exports = router;
