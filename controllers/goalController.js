const db = require('../config/db');
const addGoal = async(req,res)=>{
  try {
    const{user_id,title,target_amount,target_date} = req.body;

    if(!user_id||!title||!target_amount||!target_date){
      return res.status(400).json({message:'All required fields must be filled'});
    }
    const result = await db.query('INSERT INTO goals (user_id,title,target_amount,target_date) VALUES ($1,$2,$3,$4)',[user_id, title, target_amount, target_date]);
    res.status(201).json({message:'Goal added successfully',goal:result.rows[0]});  
  } catch (err) {
    console.error('Error adding goal:',err);
    res.status(500).json({message:'Internal server error'});
  }
};


const getGoals = async (req, res) => {
  try {
    const userId = req.params.userId;

    const result = await db.query(
      'SELECT * FROM goals WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching goals:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addGoal, getGoals };