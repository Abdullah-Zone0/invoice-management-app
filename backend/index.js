const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/create-user', (req, res) => {

    console.log('hello'); // Log the request body
    const {username, email, password} = req.body;
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('❌ Error creating table:', err);
            return res.status(500).json({ error: 'Database error' });
        }
    });
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error('❌ Error inserting data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log('✅ User created:', result);
        res.status(201).json({ message: 'User created successfully' });
    });
})
//create login route
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    console.log("body",req.body)
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('❌ Error fetching data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.length > 0) {
            console.log('✅ User logged in:', result[0]);
            res.status(200).json({ message: 'Login successful', user: result[0] });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});


app.listen(3006, () => console.log('Server running on port 3006'));
