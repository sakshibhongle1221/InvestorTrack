const {Pool} = require('pg');
require ('dotenv').config();

const pool = new Pool({ 
  // Pool(capital p) is a class of pg library and pg is a toolkit of sql and if we creating a new object from the class we use new keyword. now Pool(capital p) is like a boy aur jab we give new keyword and uske andar we write things jese yaha then that means ki mko boy chahiye uske ankar ye sab chize chahiye and named it as pool(small p). 
  // user: process.env.DB_USER,    
  // host: process.env.DB_HOST, 
  // database: process.env.DB_DATABASE, 
  // password: process.env.DB_PASSWORD, 
  // port: process.env.DB_PORT, 
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL Database!'))
  .catch((err) => console.error('❌ Database connection error:', err));

  module.exports = pool;