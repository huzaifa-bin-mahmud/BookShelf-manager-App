import BookItem from "./BookItem";

function BookList({ books, onDelete, onMarkRead }) {
  if (books.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        No books yet. Add your first book above!
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onDelete={onDelete}
          onMarkRead={onMarkRead}
        />
      ))}
    </ul>
  );
}

export default BookList;