const API_BASE = "http://localhost:4000/api/invoices";

// ✅ Send invoice to backend
export async function createInvoice(data) {
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create invoice");
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Error creating invoice:", err.message);
    throw err;
  }
}

// ✅ Get all invoices from backend
export async function getInvoices() {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Failed to fetch invoices");

    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching invoices:", err.message);
    throw err;
  }
}
