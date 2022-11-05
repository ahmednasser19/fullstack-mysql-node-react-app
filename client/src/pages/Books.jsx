import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/books`
        );
        console.log(res);
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/books/${id}`);
      window.location.reload();
      // setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Ahmed Book shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              <Link to={`/update/${book.id}`}>update</Link>{" "}
            </button>
          </div>
        ))}
      </div>
      <button>
        {" "}
        <Link to="/add">Add New Book</Link>
      </button>
    </div>
  );
};

export default Books;
