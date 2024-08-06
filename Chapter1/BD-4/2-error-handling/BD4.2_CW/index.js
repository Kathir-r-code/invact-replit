const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

// Connect to SQLite database
(async () => {
  db = await open({
    filename: "./Chapter1/BD-4/2-error-handling/BD4.2_CW/database.sqlite",
    driver: sqlite3.Database,
  });
  if (db) console.log("Connected to the SQLite database.");
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 CW " });
});

// YOUR ENPOINTS GO HERE
/**
 * Exercise 1: Fetch all movies
 * Create an endpoint /movies that fetches all the movies from the database.
 * API Call: http://localhost:3000/movies
 */
async function fetchAllMovies() {
  let query = "SELECT * FROM movies";
  let response = await db.all(query, []);
  return { movies: response };
}

app.get("/movies", async (req, res) => {
  try {
    let results = await fetchAllMovies();
    if (results.movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch all movies by genre
 * Create an endpoint /movies/genre/:genre that fetches movies based on genre from the database.
 * API Call: http://localhost:3000/movies/genre/Biography
 */
async function fetchMovieByGenre(genre) {
  let query = `SELECT * FROM movies WHERE genre = ?`;
  let response = await db.all(query, [genre]);
  return { movies: response };
}

app.get("/movies/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    let results = await fetchMovieByGenre(genre);
    if (results.movies.length === 0) {
      return res.status(404).json({ message: "No movies of this genre found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch movie details by ID
 * Create an endpoint /movies/details/:id that fetches movies based on id from the database.
 * API Call : http://localhost:3000/movies/details/3
 */
async function fetchMoviesById(id) {
  let query = `SELECT * FROM movies WHERE id = ?`;
  let response = await db.get(query, [id]);
  return { movies: response };
}
app.get("/movies/details/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let results = await fetchMoviesById(id);
    if (results.movies === undefined) {
      return res.status(404).json({ message: "No movie found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Fetch movie details by release_year
 * Create an endpoint /movies/release_year/:year that fetches movies based on release_year from the database.
 * API Call: http://localhost:3000/movies/release_year/2016
 */
async function fetchMoviesByYear(year) {
  let query = `SELECT * FROM movies WHERE release_year = ?`;
  let response = await db.all(query, [year]);
  return { movies: response };
}
app.get("/movies/release_year/:year", async (req, res) => {
  try {
    let year = req.params.year;
    let results = await fetchMoviesByYear(year);
    if (results.movies.length === 0) {
      return res.status(404).json({ message: "No movies found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
