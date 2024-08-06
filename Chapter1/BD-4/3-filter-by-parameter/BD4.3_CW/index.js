const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

// Connect to SQLite database
(async () => {
  db = await open({
    filename: "./Chapter1/BD-4/3-filter-by-parameter/BD4.3_CW/database.sqlite",
    driver: sqlite3.Database,
  });
  if (db) console.log("Connected to the SQLite database.");
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3 CW" });
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
 * Question 2: Fetch All Movies by Actor
 * Create an endpoint /movies/actor/:actor to return all movies featuring a specific actor.
 * API Call: <http://localhost:3000/movies/actor/Salman%20Khan>
 */
async function filterByActor(actor) {
  let query = `SELECT * FROM movies WHERE actor = ?`;
  let response = await db.all(query, [actor]);
  return { movies: response };
}
app.get("/movies/actor/:actor", async (req, res) => {
  let actor = req.params.actor;
  try {
    const results = await filterByActor(actor);
    if (results.movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Question 3: Fetch All Movies by Director
 * Create an endpoint /movies/director/:director to return all movies directed by a specific director.
 * API Call: <http://localhost:3000/movies/director/S.S.%20Rajamouli>
 */
async function filterByDirector(director) {
  let query = `SELECT * FROM movies WHERE director = ?`;
  let response = await db.all(query, [director]);
  return { movies: response };
}
app.get("/movies/director/:director", async (req, res) => {
  let director = req.params.director;
  try {
    const results = await filterByDirector(director);
    if (results.movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
