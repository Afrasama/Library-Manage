import React from 'react';

const BookList = ({ books, onDelete }) => {
  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author}
            <button onClick={() => {
              console.log("Deleting book with ID:", book._id); // Add console log
              onDelete(book._id);
            }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
