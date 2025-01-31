import React, { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import '../styles/Auth.css';

const Login = ({ setUser, setRole, setShowRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;
      setUser(currentUser);
      const tokenResult = await currentUser.getIdTokenResult();
      const role = tokenResult.claims.role || "user"; // Extract role from custom claims
      setRole(role); // Set role in state
      localStorage.setItem("token", tokenResult.token); // Store token
    } catch (err) {
      setError(err.message);
    }
  };

  return (
      <div className="auth-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form className="auth-form" onSubmit={handleLogin}>
          <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
          />
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
          <button type="submit" className="auth-btn">Login</button>
        </form>

        <p>
          Don't have an account?{" "}
          <button onClick={() => setShowRegister(true)} className="link-btn">Register here</button>
        </p>
      </div>
  );
};

export default Login;
