import React, { useEffect, useState } from "react";
import axios from "axios";

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    // Fetch books from the backend
    const fetchBooks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/books", {
                headers: {
                    Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjJiMzlhOWQ4MGJkZWU3NDFlZmI3OCIsImlhdCI6MTczNDUyMTc2MSwiZXhwIjoxNzM0NTI1MzYxfQ.Lwaqps4QsfSanUQAqfPogIUaTmdsVKzOWVgSr84jNbo`,
                },
            });
            setBooks(response.data);
        } catch (err) {
            setError("Failed to fetch books.");
            console.error(err);
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
                {books.map((book) => (
                    <li key={book._id}>
                        <h2>{book.title}</h2>
                        <h4>Author: {book.author}</h4>
                        <p>{book.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BooksList;
