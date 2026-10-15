require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./models/Book");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ID valid kina check korar middleware
const validateId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }
  next();
};

// POST /books → notun book add
app.post("/books", async (req, res) => {
  try {
    const { title, author } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (typeof author !== "string" || !author.trim()) {
      return res.status(400).json({ message: "Author is required" });
    }

    const book = await Book.create({ title, author });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /books → shob book
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /books/:id → ekta book delete
app.delete("/books/:id", validateId, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /books/:id → read hishebe mark
app.put("/books/:id", validateId, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { status: "read" },
      { new: true, runValidators: true }
    );
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Unknown route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (jemon invalid JSON body)
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON body" });
  }
  res.status(500).json({ message: "Server error" });
});

// MongoDB connect hole tarpor server start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });