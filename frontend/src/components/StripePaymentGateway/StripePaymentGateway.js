import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../PaymentForm/PaymentForm";

const stripePromise = loadStripe("Ypk_test_51RA3n64gIJBbZeg9WLHzAPnQt1j0cEuN3XzJr1ddQLU2ouqzlRuEgYfewnwGIBGNnrOAM26aYIBag1DTmRepaKyX00uBD9Qmc7");

const StripePaymentGateway = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripePaymentGateway;