const express = require('express');
const db = require('./config/db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const goalRoutes = require('./routes/goalRoutes')

app.use(cors());
app.use(express.json());
app.use('/',userRoutes);
app.use('/api',transactionRoutes);
app.use('/api',budgetRoutes);
app.use('/api',goalRoutes);


app.get('/',(req,res) => {
  res.send('Welcome to the  InvestorTrack Backend API !!');
});

db.query('SELECT 1')
  .then(() => console.log('⭐️ connected to postgreSQL Database!'))
  .catch((err)=> console.error('❌ Database connection error:',err));

app.listen(port,() =>{
console.log(`Server is running on port ${port}`);
});