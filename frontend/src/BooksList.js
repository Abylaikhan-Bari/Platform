import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BooksList.css";

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: "", author: "", content: "" });
    const [editingBook, setEditingBook] = useState(null); // For editing a book
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
                headers: { Authorization: `Bearer ${token}` },
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
                headers: { Authorization: `Bearer ${token}` },
            });
            setBooks([...books, response.data]);
            setNewBook({ title: "", author: "", content: "" });
        } catch (err) {
            setError("Failed to create book: " + err.message);
        }
    };

    // Update a book
    const handleUpdateBook = async () => {
        const token = localStorage.getItem("token");
        if (!token || !editingBook) {
            setError("Unauthorized: Please log in first");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:5000/api/books/${editingBook._id}`,
                editingBook,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBooks(books.map((book) => (book._id === editingBook._id ? response.data : book)));
            setEditingBook(null); // Close modal
        } catch (err) {
            setError("Failed to update book: " + err.message);
        }
    };

    // Delete a book
    const handleDeleteBook = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized: Please log in first");
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/books/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBooks(books.filter((book) => book._id !== id));
        } catch (err) {
            setError("Failed to delete book: " + err.message);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="books-container">
            <h1>Books List</h1>
            {error && <p className="error">{error}</p>}

            <div className="form-container">
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
                        <li key={book._id} className="book-item">
                            <strong>{book.title}</strong> - {book.author}
                            <p>{book.content}</p>
                            <button onClick={() => setEditingBook(book)}>Edit</button>
                            <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No books available.</p>
                )}
            </ul>

            {editingBook && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Book</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={editingBook.title}
                            onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Author"
                            value={editingBook.author}
                            onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                        />
                        <textarea
                            placeholder="Content"
                            value={editingBook.content}
                            onChange={(e) => setEditingBook({ ...editingBook, content: e.target.value })}
                        />
                        <button onClick={handleUpdateBook}>Save Changes</button>
                        <button onClick={() => setEditingBook(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BooksList;
