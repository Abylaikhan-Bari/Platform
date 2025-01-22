import React, { useState } from "react";
import { auth } from "./firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import './Auth.css'; // Ensure you have proper styles

const Login = ({ setUser, setShowRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;
      setUser(currentUser);  // Save user details
      const token = await currentUser.getIdToken();
      localStorage.setItem("token", token); // Store Firebase token
    } catch (error) {
      setError(error.message);
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
