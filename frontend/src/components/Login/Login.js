import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this for routing
import "./Login.css"; // Make sure you have this CSS file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Add this for routing

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    // Simulate successful login
    setError("");
    localStorage.setItem("isAuthenticated", "true"); // Store login status
    navigate("/dashboard"); // Redirect to dashboard
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
