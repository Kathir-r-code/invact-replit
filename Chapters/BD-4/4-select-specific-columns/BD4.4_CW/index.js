const express = require("express");
const sqllite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename:
      "./Chapters/BD-4/4-select-specific-columns/BD4.4_CW/database.sqlite",
    driver: sqllite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.4 CW Template" });
});

/**
 * Exercise 1: SELECT only id, title & release_year of all movies
 * Create an endpoint /movies to return all the movies
 * API Call: http://localhost:3000/movies
 */
async function fetchAllMovies() {
  let query = `SELECT id, title, release_year FROM movies`;
  let response = await db.all(query, []);
  return { movies: response };
}
app.get("/movies", async (req, res) => {
  try {
    const results = await fetchAllMovies();
    if (results.movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: SELECT id, title, actor & release_year from all movies by an actor
 * Create an endpoint /movies/actor/:actor to return all the movies of an actor.
 * API Call: http://localhost:3000/movies/actor/Salman%20Khan
 */
async function fetchMoviesByActor(actor) {
  let query = `SELECT id, title, actor, release_year FROM movies WHERE actor = ?`;
  let response = await db.all(query, [actor]);
  return { movies: response };
}
app.get("/movies/actor/:actor", async (req, res) => {
  let actor = req.params.actor;
  try {
    const results = await fetchMoviesByActor(actor);
    if (results.movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: SELECT id, title, director & release_year from all movies by a director
 * Create an endpoint /movies/director/:director to return all the movies of an actor.
 * API Call: http://localhost:3000/movies/director/Kabir%20Khan
 */
async function fetchMoviesByDirector(director) {
  let query = `SELECT id, title, director, release_year FROM movies WHERE director = ?`;
  let response = await db.all(query, [director]);
  return { movies: response };
}
app.get("/movies/director/:director", async (req, res) => {
  let director = req.params.director;
  try {
    const results = await fetchMoviesByDirector(director);
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
