import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Load your public Stripe key from the .env file
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  
  const stripe = useStripe();
  const elements = useElements();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get the card element from the form
    const card = elements.getElement(CardElement);

    // Create a payment method using Stripe's API
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setMessage(error.message); // Show error if there's an issue
    } else {
      // Send the payment method ID and details to your backend
      const response = await fetch("http://localhost:4000/api/stripe/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: paymentMethod.id,
          email,
          amount: parseInt(amount) * 100, // Multiply by 100 to convert to cents
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("✅ Payment Successful!");
      } else {
        setMessage("❌ Payment Failed: " + data.error);
      }
    }
  };

  return (
    <div className="payment-form">
      <h1>Payment</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
