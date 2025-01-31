import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import BooksList from "./BooksList";
import { auth } from "./config/firebase";
import "./styles/App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(""); // Store user's role
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

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
    setUser(null);
    localStorage.removeItem("token");
    setRole("");
    auth.signOut();
    setShowLogoutDialog(false);
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
              <BooksList role={role} onLogout={() => setShowLogoutDialog(true)} />
            </>
        )}

        {/* Logout Confirmation Modal */}
        {showLogoutDialog && (
            <dialog className="dialog" open>
              <div className="dialog-content">
                <h2>Are you sure you want to log out?</h2>
                <button className="btn-danger" onClick={handleLogout}>Yes, Log Out</button>
                <button className="btn-secondary1" onClick={() => setShowLogoutDialog(false)}>Cancel</button>
              </div>
            </dialog>
        )}
      </div>
  );
};

export default App;
