import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BooksList.css";

const BooksList = ({ role }) => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: "", author: "", content: "" });
    const [editingBook, setEditingBook] = useState(null);
    const [error, setError] = useState("");

    const fetchBooks = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get("http://192.168.0.31:5001/api/books", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBooks(response.data);
        } catch (err) {
            setError("Failed to fetch books: " + err.message);
        }
    };

    const handleCreateBook = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("http://192.168.0.31:5001/api/books", newBook, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBooks([...books, response.data]);
            setNewBook({ title: "", author: "", content: "" });
        } catch (err) {
            setError("Failed to create book: " + err.message);
        }
    };


    const handleUpdateBook = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(
                `http://localhost:5001/api/books/${editingBook._id}`,
                editingBook,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBooks(books.map((book) => (book._id === editingBook._id ? response.data : book)));
            setEditingBook(null);
        } catch (err) {
            setError("Failed to update book: " + err.message);
        }
    };

    const handleDeleteBook = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:5001/api/books/${id}`, {
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

            {role === "admin" && (
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
                    <button className="btn-primary" onClick={handleCreateBook}>Create Book</button>
                </div>
            )}

            <div className="books-list">
                {books.length > 0 ? (
                    books.map((book) => (
                        <div key={book._id} className="book-card">
                            <h3>{book.title}</h3>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p>{book.content}</p>
                            {role === "admin" && (
                                <>
                                    <button className="btn-secondary" onClick={() => setEditingBook(book)}>Edit</button>
                                    <button className="btn-danger" onClick={() => handleDeleteBook(book._id)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No books available.</p>
                )}
            </div>

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
                        <button className="btn-primary" onClick={handleUpdateBook}>Save Changes</button>
                        <button className="btn-secondary" onClick={() => setEditingBook(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BooksList;
