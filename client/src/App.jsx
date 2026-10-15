import { useEffect, useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

const API_URL = "http://localhost:5000/books";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Page load e shob book ana
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to load books");
        setBooks(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Add: server theke asha book ta list er shurute boshbe
  const addBook = async (title, author) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add book");
    setBooks((prev) => [data, ...prev]);
  };

  // Delete
  const deleteBook = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete book");
      setBooks((prev) => prev.filter((book) => book.id !== id));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // Mark as read
  const markAsRead = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "PUT" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update book");
      setBooks((prev) => prev.map((book) => (book.id === id ? data : book)));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          📚 BookShelf Manager
        </h1>

        <BookForm onAdd={addBook} />

        {error && (
          <p className="bg-red-100 text-red-600 text-sm rounded-lg p-3 mt-4">
            {error}
          </p>
        )}

        <div className="mt-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <BookList
              books={books}
              onDelete={deleteBook}
              onMarkRead={markAsRead}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;