import React, { useEffect, useState } from "react";
import axios from "axios";

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");

    const fetchBooks = async () => {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage

        if (!token) {
            setError("Unauthorized: Please log in first");
            return;
        }

        try {
            const response = await axios.get("http://localhost:5000/api/books", {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in Authorization header
                },
            });

            setBooks(response.data);
        } catch (err) {
            console.error("Error fetching books:", err);
            setError("Failed to fetch books: Server error or invalid token");
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
