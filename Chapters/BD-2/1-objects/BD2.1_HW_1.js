const express = require("express");
const app = express();
const PORT = 3000;

// Define an object on server: the Book
let book = {
  title: "The God of Small Things",
  author: "Arundhati Roy",
  publicationYear: 1997,
  genre: "Novel",
  isAvailable: true,
  stock: 5,
};

/**
 * Question 1: Create an endpoint that returns the details of a book stored on the server.
 * API Call: <http://localhost:3000/book>
 */
app.get("/book", (req, res) => {
  res.json(book);
});

/**
 * Question 2: Design an endpoint that provides the full title and author of the book
 * API Call: <http://localhost:3000/book/fulltitle-author>
 */
function getFullTitleAndAuthor(book) {
  return `${book.title} by ${book.author}`;
}
app.get("/book/fulltitle-author", (req, res) => {
  let fullTilteAndAuthor = getFullTitleAndAuthor(book);
  res.json({ fullTilteAndAuthor: fullTilteAndAuthor });
});

/**
 * Question 3: Develop an endpoint to access the genre and availability status of the book.
 * API Call: <http://localhost:3000/book/genre-availability>
 */
function getGenreAndAvailability(book) {
  let { genre, isAvailable } = book;
  return { genre, isAvailable };
}
app.get("/book/genre-availability", (req, res) => {
  let genreAndAvailability = getGenreAndAvailability(book);
  res.json(genreAndAvailability);
});

/**
 * Question 4: Create an endpoint to calculate and return the age of the book.
 * API Call: <http://localhost:3000/book/age>
 */
function calculateBookAge(publicationYear) {
  let currentYear = new Date().getFullYear();
  return currentYear - publicationYear;
}
app.get("/book/age", (req, res) => {
  let bookAge = calculateBookAge(book.publicationYear);
  res.json({ age: bookAge });
});

/**
 * Question 5: Implement an endpoint to provide a summary of the book including its title, author, genre, and publication year.
 * API Call: <http://localhost:3000/book/summary>
 */
function getBookSummary(book) {
  let summary = `Title:${book.title}, Author: ${book.author}, Genre:  ${book.genre}, Published: ${book.publicationYear}`;
  return { summary: summary };
}
app.get("/book/summary", (req, res) => {
  let bookSummary = getBookSummary(book);
  res.json(bookSummary);
});

/**
 * Question 6: Develop an endpoint to check the stock status of the book and determine if an order is required.
 * API Call: <http://localhost:3000/book/stock-status>
 */
function checkStockAndOrder(book) {
  if (book.stock > 0) {
    return { status: "In Stock", stock: book.stock };
  } else {
    return { status: "Out of Stock", message: "Order Required" };
  }
}
app.get("/book/stock-status", (req, res) => {
  let stockStatus = checkStockAndOrder(book);
  res.json(stockStatus);
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
