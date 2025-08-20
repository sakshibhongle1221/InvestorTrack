const express= require('express');
const router = express.Router();

const {addTransaction,getTransactions,getTransactionSummary, getDashboardStats, getInvestmentPerformance}= require('../controllers/transactionController');

router.post('/add-transaction',addTransaction);

router.get('/transactions/:userId',getTransactions);

router.get('/summary/:userId',getTransactionSummary);

router.get('/stats/:userId',getDashboardStats);

router.get('/investments/performance/:userId',getInvestmentPerformance);

module.exports = router;