const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Create invoice route, linking invoice to user email
app.post("/api/create-invoices", (req, res) => {
  const { customerEmail, description, amount, invoiceBy } = req.body;

  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS invoices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customerEmail VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        invoiceBy VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

  db.query(createTableQuery, (err) => {
    if (err) {
      console.error("❌ Error creating table:", err);
      return res.status(500).json({ error: "Database error" });
    }
  });

  const sql =
    "INSERT INTO invoices (customerEmail, description, amount, invoiceBy) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [customerEmail, description, amount, invoiceBy],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting data:", err);
        return res.status(500).json({ error: "Database error" });
      }
      console.log("✅ Invoice created:", result);
      res.status(201).json({
        message: "Invoice created successfully",
        invoiceId: result.insertId,
      });
    }
  );
});

// Fetch all invoices for the logged-in user
app.get("/api/invoices", (req, res) => {

  const sql = "SELECT * FROM invoices";
  
  db.query(sql,  (err, result) => {
    if (err) {
      console.error("❌ Error fetching invoices:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(200).json(result);
  });
});

//create login route
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  console.log("body", req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("❌ Error fetching data:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (result[0].password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: result[0],
    });
  });
});

// create invoice route
app.post("/api/create-invoices", (req, res) => {
  const { customerEmail, description, amount, invoiceBy } = req.body;
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS invoices (
            id INT AUTO_INCREMENT PRIMARY KEY,
            customerEmail VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            invoiceBy VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
  db.query(createTableQuery, (err) => {
    if (err) {
      console.error("❌ Error creating table:", err);
      return res.status(500).json({ error: "Database error" });
    }
  });
  const sql =
    "INSERT INTO invoices (customerEmail, description, amount, invoiceBy) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [customerEmail, description, amount, invoiceBy],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting data:", err);
        return res.status(500).json({ error: "Database error" });
      }
      console.log("✅ Invoice created:", result);
      res.status(201).json({
        message: "Invoice created successfully",
        invoiceId: result.insertId,
      });
    }
  );
});

app.listen(3006, () => console.log("Server running on port 3006"));
