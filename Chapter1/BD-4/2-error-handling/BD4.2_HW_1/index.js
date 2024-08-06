const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename:
      "./Chapter1/BD-4/2-error-handling/BD4.2_HW_1/books_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 HW1 Template" });
});

// YOUR ENDPOINTS GO HERE
/**
 * Exercise 1: Fetch All Books
 * Create an endpoint /books return all the books
 * API Call: http://localhost:3000/books
 */
async function fetchAllBooks() {
  let query = "SELECT * FROM books";
  let response = await db.all(query, []);
  return { books: response };
}
app.get("/books", async (req, res) => {
  try {
    let result = await fetchAllBooks();
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No books found." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch Books by Author
 * Create an endpoint /books/author/:author return all the books by a specific author.
 * API Call: http://localhost:3000/books/author/George%20Orwell
 */
async function fetchBooksByAuthor(author) {
  let query = `SELECT * FROM books WHERE author = ?`;
  let response = await db.all(query, [author]);
  return { books: response };
}
app.get("/books/author/:author", async (req, res) => {
  try {
    let author = req.params.author;
    let result = await fetchBooksByAuthor(author);
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No books of this author found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
/**
 * Exercise 3: Fetch Books by Genre
 * Create an endpoint /books/genre/:genre
 * API Call: http://localhost:3000/books/genre/Fiction
 */
async function fetchBooksByGenre(genre) {
  let query = `SELECT * FROM books WHERE genre = ?`;
  let response = await db.all(query, [genre]);
  return { books: response };
}
app.get("/books/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    let result = await fetchBooksByGenre(genre);
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No books of this genre found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Fetch Books by Publication Year
 * Create an endpoint /books/publication_year/:year return all the books
 * API Call: http://localhost:3000/books/publication_year/1960
 */
async function fetchBooksByPublicationYear(year) {
  let query = `SELECT * FROM books WHERE publication_year = ?`;
  let response = await db.all(query, [year]);
  return { books: response };
}
app.get("/books/publication_year/:year", async (req, res) => {
  try {
    let year = req.params.year;
    let result = await fetchBooksByPublicationYear(year);
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No books of this year found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
