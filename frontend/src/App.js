import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import BooksList from "./BooksList";
import { auth } from "./firebase";

const App = () => {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

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
