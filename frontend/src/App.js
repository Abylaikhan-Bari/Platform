import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";  // Import the Login component
import BooksList from "./BooksList";

const App = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    return (
        <div>
            {!user ? (
                <>
                    <Login setUser={setUser} /> {/* Show login form if user is not logged in */}
                    <p>Don't have an account? <a href="#register">Register here</a></p>
                </>
            ) : (
                <>
                    <BooksList />
                    <button onClick={() => {
                        setUser(null);
                        localStorage.removeItem("token");
                        auth.signOut();
                    }}>Log Out</button>
                </>
            )}
        </div>
    );
};

export default App;
