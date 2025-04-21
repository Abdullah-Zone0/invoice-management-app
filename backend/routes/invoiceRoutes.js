const express = require('express');
const router = express.Router();
const { createInvoice, getAllInvoices } = require('../controllers/invoiceController');

// Route
router.post('/invoices', createInvoice);   // Admin only
router.get('/invoices', getAllInvoices);   // Everyone (agent/admin)

module.exports = router;
