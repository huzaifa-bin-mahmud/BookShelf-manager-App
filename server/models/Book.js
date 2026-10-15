const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["unread", "read"],
    default: "unread",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// _id ke id hishebe return korbe, format: { id, title, author, status, createdAt }
bookSchema.set("toJSON", {
  transform: (doc, ret) => ({
    id: ret._id.toString(),
    title: ret.title,
    author: ret.author,
    status: ret.status,
    createdAt: ret.createdAt,
  }),
});

module.exports = mongoose.model("Book", bookSchema);