import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async (book) => {
    try {
      await axios.post('http://localhost:5000/books', book);
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const deleteBook = async (id) => {
    console.log("ID to delete:", id); // Add console log
    try {
      const response = await axios.delete(`http://localhost:5000/books/${id}`);
      console.log("Delete response:", response); // Add console log
      if (response.status === 200) {
        fetchBooks();  // Refresh the list after successful deletion
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="App">
      <h1>Library Management System</h1>
      <AddBook onAdd={addBook} />
      <BookList books={books} onDelete={deleteBook} />
    </div>
  );
};

export default App;
