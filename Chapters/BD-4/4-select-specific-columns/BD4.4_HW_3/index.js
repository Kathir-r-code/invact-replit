const express = require("express");
const sqllite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename:
      "./Chapters/BD-4/4-select-specific-columns/BD4.4_HW_3/database.sqlite",
    driver: sqllite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.4 HW3 Template" });
});

/**
 * Exercise 1: Fetch All Books
 * Create an endpoint /books to return all the books.
 * API Call: http://localhost:3000/books
 * columns: id, title & author.
 */
async function fetchAllBooks() {
  let query = `SELECT id, title, author FROM books`;
  let response = await db.all(query, []);
  return { books: response };
}
app.get("/books", async (req, res) => {
  try {
    const results = await fetchAllBooks();
    if (results.books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch Books by Author
 * Create an endpoint /books/author/:author to return books by the given author.
 * API Call: http://localhost:3000/books/author/Dan%20Brown
 * columns: id, title, author, and year.
 */
async function fetchBooksByAuthor(author) {
  let query = `SELECT id, title, author, year FROM books WHERE author = ?`;
  let respose = await db.all(query, [author]);
  return { books: respose };
}
app.get("/books/author/:author", async (req, res) => {
  let author = req.params.author;
  try {
    const results = await fetchBooksByAuthor(author);
    if (results.books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch Books by Genre
 * Create an endpoint /books/genre/:genre to return books by the given genre.
 * API Call: http://localhost:3000/books/genre/Fantasy
 * columns: id, title, author, and genre.
 */
async function fetchBooksByAuthor(genre) {
  let query = `SELECT id, title, author, genre FROM books WHERE genre = ?`;
  let respose = await db.all(query, [genre]);
  return { books: respose };
}
app.get("/books/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  try {
    const results = await fetchBooksByAuthor(genre);
    if (results.books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4 : Fetch Books by Year
 * Create an endpoint /books/year/:year to return books by the given year.
 * API Call: http://localhost:3000/books/year/2000
 * columns: id, title, author, genre and year.
 */
async function fetchBooksByYear(year) {
  let query = `SELECT id, title, author, genre, year FROM books WHERE year = ?`;
  let respose = await db.all(query, [year]);
  return { books: respose };
}
app.get("/books/year/:year", async (req, res) => {
  let year = req.params.year;
  try {
    const results = await fetchBooksByYear(year);
    if (results.books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
