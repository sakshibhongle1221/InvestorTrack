const db = require('../config/db');

const addBudget = async(req,res) =>{
  try {
    const {user_id,category,amount,month} = req.body;
    if(!user_id||!category||!amount||!month){
      return res.status(400).json({message:'All fields are required'});
    }
    const result = await db.query('INSERT INTO budgets(user_id,category,amount,month) VALUES ($1,$2,$3,$4) RETURNING *',[user_id,category,amount,month]);
    res.status(201).json({message:'Budget added successfully',budget:result.rows[0],});
  } catch (err) {
    console.error('Error adding budget:',err);
    res.status(500).json({message:'Server error'});
  }
};

const getBudgets = async(req,res)=>{
  try {
    const userId = req.params.userId;
    const result = await db.query('SELECT * FROM budgets WHERE user_id = $1 ORDER BY created_at DESC',[userId]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching budgets:',err);
    res.status(500).json({message:'server error'});
  }
};

module.exports = {addBudget,getBudgets};