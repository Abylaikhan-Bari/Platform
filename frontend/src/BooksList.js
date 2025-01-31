import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/BooksList.css";

const BooksList = ({ role, onLogout }) => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: "", author: "", content: "" });
    const [editingBook, setEditingBook] = useState(null);
    const [bookToDelete, setBookToDelete] = useState(null);
    const [error, setError] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [dialogType, setDialogType] = useState(""); // 'add', 'edit', 'delete'

    useEffect(() => {
        fetchBooks();
    }, []);

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
            setShowDialog(false);
        } catch (err) {
            setError("Failed to create book: " + err.message);
        }
    };

    const handleUpdateBook = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(
                `http://192.168.0.31:5001/api/books/${editingBook._id}`,
                editingBook,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBooks(books.map((book) => (book._id === editingBook._id ? response.data : book)));
            setEditingBook(null);
            setShowDialog(false);
        } catch (err) {
            setError("Failed to update book: " + err.message);
        }
    };

    const handleDeleteBook = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://192.168.0.31:5001/api/books/${bookToDelete._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBooks(books.filter((book) => book._id !== bookToDelete._id));
            setBookToDelete(null);
            setShowDialog(false);
        } catch (err) {
            setError("Failed to delete book: " + err.message);
        }
    };

    return (
        <div className="books-page">
            {/* 🔹 HEADER */}
            <header className="header">
                <h1>📚 Book Store</h1>
                <nav>
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </nav>
            </header>

            {/* 🔹 MAIN CONTENT */}
            <main className="main-content">
                <h2>📖 Available Books</h2>
                {error && <p className="error-message">{error}</p>}

                {/* Admin Add Book Button */}
                {role === "admin" && (
                    <button className="btn-primary" onClick={() => { setDialogType("add"); setShowDialog(true); }}>
                        ➕ Add Book
                    </button>
                )}

                {/* Book Cards Display */}
                <div className="books-grid">
                    {books.length > 0 ? (
                        books.map((book) => (
                            <div key={book._id} className="book-card">
                                <h3>{book.title}</h3>
                                <p><strong>Author:</strong> {book.author}</p>
                                <p>{book.content}</p>
                                {role === "admin" && (
                                    <div className="admin-actions">
                                        <button className="btn-secondary" onClick={() => { setEditingBook(book); setDialogType("edit"); setShowDialog(true); }}>✏️ Edit</button>
                                        <button className="btn-danger" onClick={() => { setBookToDelete(book); setDialogType("delete"); setShowDialog(true); }}>🗑 Delete</button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="empty-message">No books available.</p>
                    )}
                </div>
            </main>

            {/* 🔹 FOOTER */}
            <footer className="footer">
                <p>© 2025 Book Store. All rights reserved.</p>
            </footer>

            {/* 🔹 DIALOG WINDOW FOR ADD/EDIT/DELETE BOOK */}
            {showDialog && (
                <dialog className="dialog" open>
                    <div className="dialog-content">
                        {dialogType === "delete" ? (
                            <>
                                <h2>Are you sure you want to delete?</h2>
                                <p><strong>Title:</strong> {bookToDelete?.title}</p>
                                <p><strong>Author:</strong> {bookToDelete?.author}</p>
                                <button className="btn-danger" onClick={handleDeleteBook}>Yes, Delete</button>
                            </>
                        ) : (
                            <>
                                <h2>{dialogType === "edit" ? "Edit Book" : "Add New Book"}</h2>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={dialogType === "edit" ? editingBook.title : newBook.title}
                                    onChange={(e) => dialogType === "edit"
                                        ? setEditingBook({ ...editingBook, title: e.target.value })
                                        : setNewBook({ ...newBook, title: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Author"
                                    value={dialogType === "edit" ? editingBook.author : newBook.author}
                                    onChange={(e) => dialogType === "edit"
                                        ? setEditingBook({ ...editingBook, author: e.target.value })
                                        : setNewBook({ ...newBook, author: e.target.value })}
                                />
                                <textarea
                                    placeholder="Content"
                                    value={dialogType === "edit" ? editingBook.content : newBook.content}
                                    onChange={(e) => dialogType === "edit"
                                        ? setEditingBook({ ...editingBook, content: e.target.value })
                                        : setNewBook({ ...newBook, content: e.target.value })}
                                />
                                <button className="btn-primary" onClick={dialogType === "edit" ? handleUpdateBook : handleCreateBook}>
                                    {dialogType === "edit" ? "Save Changes" : "Add Book"}
                                </button>
                            </>
                        )}
                        <button className="btn-secondary" onClick={() => { setShowDialog(false); setEditingBook(null); setBookToDelete(null); }}>Cancel</button>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default BooksList;
