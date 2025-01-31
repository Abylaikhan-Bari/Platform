import React, { useState } from "react";
import { auth } from "./config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import './styles/Auth.css';

const Register = ({ setUser, setShowRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      setUser(currentUser);  // Save user details
      const token = await currentUser.getIdToken();
      localStorage.setItem("token", token);  // Store Firebase token
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form className="auth-form" onSubmit={handleRegister}>
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
        <button type="submit" className="auth-btn">Register</button>
      </form>

      <p>
        Already have an account?{" "}
        <button onClick={() => setShowRegister(false)} className="link-btn">Login here</button>
      </p>
    </div>
  );
};

export default Register;
