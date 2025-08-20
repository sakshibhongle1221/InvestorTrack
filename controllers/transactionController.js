const db = require('../config/db');


const addTransaction = async (req,res) => {
  try {
    const {user_id,amount,type,category,description} = req.body;

    if(!user_id || !amount|| !type|| !category){
      return res.status(400).json({message:'All required fields must be filled'});    
    }
    const result = await db.query('INSERT INTO transactions (user_id,amount,type,category,description) VALUES ($1,$2,$3,$4,$5) RETURNING *',[user_id,amount,type,category,description]);

    res.status(201).json({message:'Transaction added successfully',transaction:result.rows[0]});
  } catch (err) {
    console.error(err);
    res.status(500).json({message:'Error adding transaction'});
  }
};


const getTransactions = async(req,res)=>{
  try {
    const userId = req.params.userId;
    const result = await db.query('SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC',[userId]);
    res.status(200).json(result.rows);

  } catch (err) {
    console.error('Error fetching transactions :',err);
    res.status(500).json({message:'Internal server error'});
  
  }
};

const getTransactionSummary = async(req,res) =>{
  try {
   const userId = req.params.userId;
   const result = await db.query(
    `SELECT category, SUM(amount) as total_amount FROM transactions WHERE user_id =$1 AND type ='expense' GROUP BY category`,[userId]
   );
   res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching transaction summary:',err);
    res.status(500).json({message: 'Internal server error'});
  }
};


const getDashboardStats = async(req,res)=>{
  try {
    const userId = req.params.userId;
    const incomeResult = await db.query(
      "SELECT SUM(amount) as total FROM transactions WHERE user_id = $1 AND type = 'income'",[userId]
    );
    const totalIncome = incomeResult.rows[0].total || 0;

    const expenseResult = await db.query(
      "SELECT SUM(amount) as total FROM transactions WHERE user_id = $1 AND type = 'expense'",[userId]
    );

    const totalExpenses = expenseResult.rows[0].total || 0;

    const netWorth = totalIncome - totalExpenses;

    res.status(200).json({
      netWorth: netWorth,
      totalIncome: totalIncome,
      totalExpenses: totalExpenses,
    });
  } catch (err) {
    console.error('Error fetching dashboard stats:',err);
    res.status(500).json({message: 'Internal server error'});
  }
};


const getInvestmentPerformance = async (req, res) => {
  try {
    const sampleData = [
    {month: 'jan',value: 12000},
    {month: 'Feb',value: 12500},
    {month: 'Mar',value: 12300},
    {month: 'Apr',value: 12800},
    {month: 'May',value: 13500},
    {month: 'Jun',value: 14000},
    ];
    res.status(200).json(sampleData);
  }
  catch(err){
    console.error('Error fetching investment performance :',err);
    res.status(500).json({message:'Internal server error'});
  }
};



module.exports ={addTransaction,getTransactions,getTransactionSummary,getDashboardStats,getInvestmentPerformance};