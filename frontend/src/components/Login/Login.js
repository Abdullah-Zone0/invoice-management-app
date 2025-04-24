import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // External CSS

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3006/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setError("");
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="illustration-box">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%89%8D%E9%9D%A2%204.%20Lovebirds%20Website%20Login%20Design.jpg-1paoL13xn74ze0DJ424BHsfCXvnvkO.jpeg"
            alt="Decorative"
          />
          <h2>Maecenas mattis egestas</h2>
          <p>Eidum et malesuada fames ac ante ipsum primis in faucibus suspendisse porta</p>
          <div className="dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="form-wrapper">
          <h1 className="logo">Techxon</h1>
          <h2 className="welcome">Welcome to Techxon</h2>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">User Name or Email</label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-right">
               <a href="#" className="forgot-link">Forget password?</a>
              </div>
            </div>

            <button type="submit" className="btn">Sign In</button>

            <div className="divider">
              <span>or</span>
            </div>

            <button className="btn outline">
              <img src="/placeholder.svg" alt="Google" />
              Sign in with Google
            </button>

            <p className="new-account">
              New Lovebirds? <a href="#">Create Account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
