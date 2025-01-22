import React, { useState } from "react";
import { auth } from "./firebase";  // Correctly import Firebase Auth
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      setUser(currentUser);  // Save user details
      const token = await currentUser.getIdToken();
      localStorage.setItem("token", token);  // Store Firebase token
    } catch (error) {
      setError(error.message); // Handle errors
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default Register;
