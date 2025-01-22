import React, { useEffect, useState } from "react";
import axios from "axios";

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");

    const fetchBooks = async () => {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage

        console.log("Token retrieved from localStorage:", token);  // Debugging log

        if (!token) {
            setError("Unauthorized: Please log in first");
            return;
        }

        try {
            const response = await axios.get("http://localhost:5000/api/books", {
                headers: {
                    Authorization: `Bearer ${token}`, // Send token in Authorization header
                },
            });

            console.log("Books fetched:", response.data);  // Debugging log for books

            setBooks(response.data);
        } catch (err) {
            console.error("Error fetching books:", err);  // Debugging log for errors
            if (err.response && err.response.data) {
                setError(err.response.data.message || "Failed to fetch books");
            } else {
                setError("Failed to fetch books: Server error or invalid token");
            }
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Books List</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {books.length > 0 ? (
                    books.map((book) => (
                        <li key={book._id}>
                            <strong>{book.title}</strong> - {book.author}
                            <p>{book.content}</p>
                        </li>
                    ))
                ) : (
                    <p>No books available.</p>
                )}
            </ul>
        </div>
    );
};

export default BooksList;
