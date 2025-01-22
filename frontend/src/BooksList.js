// src/BooksList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: "", author: "", content: "" });
    const [error, setError] = useState("");

    // Fetch books from the server
    const fetchBooks = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Unauthorized: Please log in first");
            return;
        }

        try {
            const response = await axios.get("http://localhost:5000/api/books", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBooks(response.data);
        } catch (err) {
            setError("Failed to fetch books: " + err.message);
        }
    };

    // Create a new book
    const handleCreateBook = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Unauthorized: Please log in first");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/books", newBook, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBooks([...books, response.data]); // Add the new book to the list
            setNewBook({ title: "", author: "", content: "" });
        } catch (err) {
            setError("Failed to create book: " + err.message);
        }
    };

    // Update a book
    const handleUpdateBook = async (id) => {
        const updatedBook = { ...newBook };
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Unauthorized: Please log in first");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/books/${id}`, updatedBook, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBooks(books.map((book) => (book._id === id ? response.data : book)));  // Update book in the list
        } catch (err) {
            setError("Failed to update book: " + err.message);
        }
    };

    // Delete a book
    const handleDeleteBook = async (id) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Unauthorized: Please log in first");
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/books/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBooks(books.filter((book) => book._id !== id));  // Remove the deleted book
        } catch (err) {
            setError("Failed to delete book: " + err.message);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Books List</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <h2>Create a New Book</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                />
                <textarea
                    placeholder="Content"
                    value={newBook.content}
                    onChange={(e) => setNewBook({ ...newBook, content: e.target.value })}
                />
                <button onClick={handleCreateBook}>Create Book</button>
            </div>
            <ul>
                {books.length > 0 ? (
                    books.map((book) => (
                        <li key={book._id}>
                            <strong>{book.title}</strong> - {book.author}
                            <p>{book.content}</p>
                            <button onClick={() => handleUpdateBook(book._id)}>Update</button>
                            <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
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
