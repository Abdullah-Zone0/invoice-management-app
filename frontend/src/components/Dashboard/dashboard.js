import React, { useState, useEffect } from "react";
import "./dashboard.css";

export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    customerEmail: "",
    description: "",
    amount: "",
    invoiceBy: ""
  });

  useEffect(() => {
    fetch("http://localhost:4000/api/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data));
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4000/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newInvoice) => {
        setInvoices([newInvoice, ...invoices]);
        setShowModal(false);
        setFormData({ customerEmail: "", description: "", amount: "", invoiceBy: "" });
      });
  }

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
        <button className="create-invoice-btn" onClick={() => setShowModal(true)}>Create Invoice</button>
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
                <tr key={invoice._id}>
                  <td>{invoice._id}</td>
                  <td>{invoice.customerEmail}</td>
                  <td>{invoice.description}</td>
                  <td>${invoice.amount}</td>
                  <td className={`status ${invoice.status.toLowerCase()}`}>{invoice.status}</td>
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
                <input name="customerEmail" value={formData.customerEmail} onChange={handleChange} placeholder="Customer Email" required />
                <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
                <input name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
                <input name="invoiceBy" value={formData.invoiceBy} onChange={handleChange} placeholder="Invoice By" required />
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
