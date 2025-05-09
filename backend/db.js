const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: 'localhost',      // PHP ke XAMPP mein bhi localhost hoga
  user: 'root',           // Default XAMPP MySQL user
  password: 'asdf1234',           // Agar password set nahi kiya to empty
  database: 'invoice-flow' // Tumhara PHP mein banaya hua database name
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    return;
  }
  console.log('✅ MySQL Connected');
});

module.exports = db;
