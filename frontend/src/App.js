import React, { useState } from "react";
import { auth } from "./firebase";  // Correctly import Firebase Auth
import { signInWithEmailAndPassword } from "firebase/auth";
import BooksList from "./BooksList";

const App = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const currentUser = userCredential.user;
            setUser(currentUser); // Save user details
            const token = await currentUser.getIdToken();
            localStorage.setItem("token", token); // Store Firebase token
        } catch (error) {
            setError(error.message); // Handle errors
        }
    };

    return (
        <div>
            {user ? (
                <>
                    <BooksList />
                    <button onClick={() => auth.signOut()}>Log Out</button>
                </>
            ) : (
                <>
                    <h2>Login</h2>
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
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default App;
