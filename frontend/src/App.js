import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import BooksList from "./BooksList";
import { auth } from "./firebase";
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(""); // Store user's role
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for a token and set the user on app initialization
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          const tokenResult = await currentUser.getIdTokenResult();
          setRole(tokenResult.claims.role || "user"); // Set role from token claims
          setUser(currentUser);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setUser(null);
      localStorage.removeItem("token");
      setRole("");
      auth.signOut();
    }
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
      <div className="app-container">
        {!user ? (
            <>
              {showRegister ? (
                  <Register setUser={setUser} setShowRegister={setShowRegister} />
              ) : (
                  <Login setUser={setUser} setRole={setRole} setShowRegister={setShowRegister} />
              )}
            </>
        ) : (
            <>
              <BooksList role={role} />
              <button onClick={handleLogout}>Log Out</button>
            </>
        )}
      </div>
  );
};

export default App;
