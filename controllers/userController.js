const db = require('../config/db');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');

 const signupUser = async (req,res ) => {
 // “From the user’s submitted form (which is in req.body), pull out the email and password values, and store them in two variables called email and password.”
 try {
  const {email,password} = req.body ;
  const existingUser = await db.query('SELECT * FROM users WHERE email = $1',[email]);
  if(existingUser.rows.length > 0){
    return res.status(400).json({message: 'user already exists'})
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password,salt);
  await db.query('INSERT INTO users (email,password_hash) VALUES ($1,$2)',[email,hashedPassword]);
  res.status(201).json({ message: 'User created successfully' });
 } 
 catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
 }
 };

 const loginUser = async (req,res) => {
  try {
    const {email,password} = req.body;
    const user = await db.query('SELECT * FROM users WHERE email = $1',[email]);
    if(user.rows.length === 0){
      return res.status(400).json({message: 'user does not exist'});
    } 
    const storedHashedPassword = user.rows[0].password_hash;
    const isMatch = await bcrypt.compare(password,storedHashedPassword);

    if(!isMatch){
      return res.status(401).json({message:'Invalid Password'});
    }
    const token = jwt.sign({ userID: user.rows[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token: token, userId: user.rows[0].user_id, message: 'Login Succesful' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong on the server' });
  }
 }

module.exports = { signupUser, loginUser};