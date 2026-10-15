function BookItem({ book, onDelete, onMarkRead }) {
  const isRead = book.status === "read";

  return (
    <li className="bg-white rounded-xl shadow p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3
          className={`text-lg font-semibold ${
            isRead ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {book.title}
        </h3>
        <p className="text-sm text-gray-500">by {book.author}</p>
        <span
          className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
            isRead
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {isRead ? "✓ Read" : "Unread"}
        </span>
      </div>

      <div className="flex gap-2">
        {!isRead && (
          <button
            onClick={() => onMarkRead(book.id)}
            className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Mark as read
          </button>
        )}
        <button
          onClick={() => onDelete(book.id)}
          className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default BookItem;