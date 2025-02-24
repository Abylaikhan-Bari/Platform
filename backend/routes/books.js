const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

// Create a Book (Admin only)
router.post("/", auth, checkRole("admin"), async (req, res) => {
    try {
        const { title, author, content } = req.body;

        // Validation check
        if (!title || !author) {
            return res.status(400).json({ error: "Title and Author are required" });
        }

        const newBook = new Book({ title, author, content });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Books (All users)
router.get("/", auth, async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a Book (Admin only)
router.put("/:id", auth, checkRole("admin"), async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a Book (Admin only)
router.delete("/:id", auth, checkRole("admin"), async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
