import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";  // Import the Login component
import BooksList from "./BooksList";

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false); // Toggle between login and register

  return (
    <div>
      {!user ? (
        <>
          {showRegister ? (
            <Register setUser={setUser} />
          ) : (
            <Login setUser={setUser} />
          )}

          <p>
            {showRegister ? (
              <>
                Already have an account?{" "}
                <a href="#login" onClick={() => setShowRegister(false)}>
                  Login
                </a>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <a href="#register" onClick={() => setShowRegister(true)}>
                  Register
                </a>
              </>
            )}
          </p>
        </>
      ) : (
        <>
          <BooksList />
          <button
            onClick={() => {
              setUser(null);
              localStorage.removeItem("token");
              auth.signOut();
            }}
          >
            Log Out
          </button>
        </>
      )}
    </div>
  );
};

export default App;
