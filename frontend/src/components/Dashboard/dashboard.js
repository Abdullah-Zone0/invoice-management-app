import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";

export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    customerEmail: "",
    description: "",
    amount: "",
    invoiceBy: "",
    paymentMethod: "stripe",
  });

  // Assume you have the logged-in user's email stored in localStorage
  const loggedInEmail = localStorage.getItem("userEmail");

  // Fetch invoices for the logged-in user using async/await
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("http://localhost:3006/api/invoices");
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    
    fetchInvoices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that amount is a valid number
    const amount = parseFloat(formData.amount);
    if (isNaN(amount)) {
      alert("Please enter a valid amount.");
      return;
    }

    // Log the data being sent
    console.log("Form Data Sent: ", formData);

    try {
      const response = await axios.post("http://localhost:3006/api/create-invoices", {
        ...formData,
        amount, // Ensure amount is a number
      });

      console.log("New Invoice Created: ", response.data);
      setInvoices([response.data, ...invoices]);
      setShowModal(false);
      setFormData({
        customerEmail: "",
        description: "",
        amount: "",
        invoiceBy: "",
        paymentMethod: "stripe",
      });
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  console.log(invoices, "invoice");

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, ADMIN Dashboard</h1>
      </header>

      <div className="dashboard-actions">
        <button className="logout-btn">Logout</button>
      </div>

      <div className="dashboard-tabs">
        <button className="tab-btn active">Invoices</button>
        <button className="tab-btn">Agents</button>
        <button className="tab-btn">Payment</button>
        <button className="tab-btn">Reports</button>
      </div>

      <div className="dashboard-content">
        <button
          className="create-invoice-btn"
          onClick={() => setShowModal(true)}
        >
          Create Invoice
        </button>
        <h2>Invoices</h2>

        <div className="table-container">
          <table className="invoices-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Customer Email</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Invoice By</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.customerEmail}</td>
                  <td>{invoice.description}</td>
                  <td>${invoice.amount}</td>
                  <td className={`status ${invoice.status}`}>
                    {invoice.status}
                  </td>
                  <td>{invoice.invoiceBy}</td>
                  <td>{invoice.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Create New Invoice</h3>
              <form onSubmit={handleSubmit}>
                <input
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="Customer Email"
                  required
                />
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  required
                />
                <input
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  placeholder="Payment Method"
                  onChange={handleChange}
                  required
                />
                <input
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Amount"
                  required
                />
                <input
                  name="invoiceBy"
                  value={formData.invoiceBy}
                  onChange={handleChange}
                  placeholder="Invoice By"
                  required
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
