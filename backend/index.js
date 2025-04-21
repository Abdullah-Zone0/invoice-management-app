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

app.listen(3006, () => console.log('Server running on port 3006'));
