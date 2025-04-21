import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXX"); // <-- apni publishable key yahan lagao

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const card = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setMessage(error.message);
    } else {
      const res = await fetch("http://localhost:4000/api/stripe/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: paymentMethod.id,
          email,
          amount: parseInt(amount) * 100,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Payment Successful!");
      } else {
        setMessage("❌ Payment Failed: " + data.error);
      }
    }
  };

  return React.createElement("form", { onSubmit: handleSubmit, className: "p-4 max-w-md mx-auto space-y-4" }, [
    React.createElement("input", {
      key: "email",
      type: "email",
      placeholder: "Email",
      className: "w-full border p-2",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      required: true,
    }),
    React.createElement("input", {
      key: "amount",
      type: "number",
      placeholder: "Amount (USD)",
      className: "w-full border p-2",
      value: amount,
      onChange: (e) => setAmount(e.target.value),
      required: true,
    }),
    React.createElement(CardElement, {
      key: "card",
      className: "border p-2",
    }),
    React.createElement("button", {
      key: "btn",
      type: "submit",
      className: "bg-blue-600 text-white px-4 py-2",
    }, "Pay"),
    React.createElement("p", { key: "msg" }, message),
  ]);
}

function StripeCheckout() {
  return React.createElement(Elements, { stripe: stripePromise }, React.createElement(CheckoutForm));
}

export default StripeCheckout;
