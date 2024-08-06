const express = require("express");
const sqllite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./Chapter1/BD-4/5-sql-comparison-operators/BD4.5_CW/database.sqlite",
    driver: sqllite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.5 CW Template" });
});

/**
 * Exercise 1: Filter Movies by Year and Actor
 * Create an endpoint /movies/year-actor to return all movies filtered by release year and actor.
 * API Call: http://localhost:3000/movies/year-actor?releaseYear=2019&actor=Hrithik%20Roshan
 */
async function filterByYearAndActor(releaseYear, actor) {
  let query = `SELECT * FROM movies WHERE release_year = ? AND actor = ?`;
  let response = await db.all(query, [releaseYear, actor]);
  return { movies: response };
}
app.get("/movies/year-actor", async (req, res) => {
  let releaseYear = req.query.releaseYear;
  let actor = req.query.actor;
  try {
    const results = await filterByYearAndActor(releaseYear, actor);
    if (results.movies.length === 0) {
      return res.status(404).json({
        message: `No movies found for year ${releaseYear} by this actor ${actor}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch Award Winning Movies
 * Create an endpoint /movies/award-winning to return all award-winning movies.
 * API Call: http://localhost:3000/movies/award-winning
 */
async function filterAwardWinningMovies() {
  let query = `SELECT * FROM movies WHERE rating >= 4.5 ORDER BY rating`;
  let response = await db.all(query, []);
  return { movies: response };
}
app.get("/movies/award-winning", async (req, res) => {
  try {
    const results = await filterAwardWinningMovies();
    if (results.movies.length === 0) {
      return res.status(404).json({
        message: `No award winning movies found`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch Blockbuster Movies
 * Create an endpoint /movies/blockbuster to return all blockbuster movies.
 * API Call: http://localhost:3000/movies/blockbuster
 */
async function fetchBlockbusterMovies() {
  let query = `SELECT * FROM movies WHERE box_office_collection >= 100 ORDER BY box_office_collection DESC`;
  let response = await db.all(query, []);
  return { movies: response };
}
app.get("/movies/blockbuster", async (req, res) => {
  try {
    const results = await fetchBlockbusterMovies();
    if (results.movies.length === 0) {
      return res.status(404).json({
        message: `No blockbuster movies found`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
