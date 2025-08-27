const express = require('express');
const db = require('./config/db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const goalRoutes = require('./routes/goalRoutes');

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/goals', goalRoutes);

app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/budgets', budgetRoutes);
app.use('/goals', goalRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the InvestorTrack Backend API !!');
});

(async () => {
  try {
    await db.query('SELECT 1');
    console.log('⭐️ Connected to PostgreSQL Database!');
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  }
})();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
