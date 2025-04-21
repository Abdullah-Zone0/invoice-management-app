import styled from "styled-components";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";

const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
    },
  },
};

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !amount || !elements.getElement(CardElement)) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const finalTotal = parseInt(amount) * 100;

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        console.error("Error creating payment method:", error.message);
        alert(error.message);
        setLoading(false);
        return;
      }

      const { id } = paymentMethod;
      const response = await axios.post("http://localhost:4000/payment", {
        amount: finalTotal,
        id,
        email,
      });

      if (response.data.success) {
        console.log("Successful payment");
        setSuccess(true);
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
    <div className="box">
      <div className="square" />
      <div className="square" />
      <div className="square" />
      <div className="square" />
      <div className="square" />
      <div className="square" />
      <div className="container">
        <div className="form">
          <h2>LOGIN</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
          >
            <Form className="LoginForm">
              <div className="inputBx">
                <Field
                  name="email"
                  type="email"
                  className="inputBox"
                  autoComplete="username"
                  placeholder="Email/Username"
                />
                <span className="spanInput">Email/Username</span>
                <i className="fas fa-user-circle" />
                <ErrorMessage component="span" name="email" className="form-error" />
              </div>
              <div className="inputBx password">
                <Field
                  name="password"
                  type="password"
                  className="inputBox"
                  id="password-input"
                  placeholder="Password"
                />
                <span className="spanInput">Password</span>
                <a
                  href="#"
                  className={isActive ? 'password-control view' : 'password-control'}
                  onClick={(event) => show_hide_password(event)}
                />
                <i className="fas fa-key" />
                <ErrorMessage component="span" name="password" className="form-error" />
              </div>
              <div className="inputBx">
                <input type="submit" value="Log in" />
              </div>
            </Form>
          </Formik>
          <p>
            Forgot password? {!logado && <Link to="/register">Click Here</Link>}
          </p>
          <p>
            Don't have an account? {!logado && <Link to="/register">Sign up</Link>}
          </p>
        </div>
      </div>
    </div>
    <Toaster />
  </section>
  );
};

export default PaymentForm;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  background: linear-gradient(135deg, #eaf0ff, #d4e4ff);
  backdrop-filter: blur(8px);
  box-shadow: 0 6px 30px rgba(66, 110, 255, 0.2);
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  margin: auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease-in-out;

  input,
  select {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #ccc;
    outline: none;
    transition: all 0.3s ease-in-out;
  }

  input:focus,
  select:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 5px var(--primary-color);
  }

  .price-display {
    margin-top: 1.5rem;
    font-size: 1.8rem;
    font-weight: bold;
    color: #426eff;
    text-align: center;
  }

  button {
    width: 100%;
    margin-top: 2rem;
    height: 48px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(145deg, var(--primary-color), #3a5ee7);
    color: white;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 0 6px 20px rgba(66, 110, 255, 0.3);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(66, 110, 255, 0.4);
  }

  button:active {
    transform: scale(0.98);
    background: #3554c6;
    box-shadow: 0 6px 15px rgba(66, 110, 255, 0.25);
  }

  .FormGroup {
    margin: 1.5rem 0;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1),
                0 8px 24px rgba(66, 110, 255, 0.1);
    backdrop-filter: blur(14px);
    transition: 0.3s ease;
  }

  .FormGroup:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(66, 110, 255, 0.15);
  }

  .FormRow {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 1rem;
  background-color: rgba(0, 255, 195, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(21, 254, 0, 0.3);
  margin-top: 20px;
  color:rgb(218, 229, 9);

  h2 {
    font-size: 1.6rem;
    color: #4CAF50;
  }

  p {
    font-size: 1.2rem;
    margin-top: 10px;
  }
`;
