import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import BooksList from "./BooksList";
import { auth } from "./firebase";
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  // Check for a token and set the user on app initialization
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          setUser(currentUser); // Set authenticated user
        }
        setLoading(false); // Finish loading
      });
    } else {
      setLoading(false); // No token, finish loading
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setUser(null);
      localStorage.removeItem("token");
      auth.signOut();
    }
  };

  if (loading) {
    // Show a loader while verifying the user's authentication state
    return <div className="loader">Loading...</div>;
  }

  return (
      <div className="app-container">
        {!user ? (
            <>
              {showRegister ? (
                  <Register setUser={setUser} setShowRegister={setShowRegister} />
              ) : (
                  <Login setUser={setUser} setShowRegister={setShowRegister} />
              )}
            </>
        ) : (
            <>
              <BooksList />
              <button onClick={handleLogout}>Log Out</button>
            </>
        )}
      </div>
  );
};

export default App;
