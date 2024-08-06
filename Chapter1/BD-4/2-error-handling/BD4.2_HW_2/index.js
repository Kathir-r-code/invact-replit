const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename:
      "./CChapter1/BD-4/2-error-handling/BD4.2_HW_2/tracks_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 HW2 Template" });
});

// YOUR ENDPOINTS GO HERE
/**
 * Exercise 1: Retrieve All Tracks
 * Define the endpoint /tracks to retrieve all music tracks.
 * API call : http://localhost:3000/tracks
 */
async function fetchAllTracks() {
  let query = "SELECT * FROM tracks";
  let response = await db.all(query, []);
  return { tracks: response };
}
app.get("/tracks", async (req, res) => {
  try {
    let result = await fetchAllTracks();
    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Retrieve Tracks by Artist
 * Define the endpoint /tracks/artist/:artist to retrieve tracks by a specific artist.
 * API call : http://localhost:3000/tracks/artist/Arijit%20Singh
 */
async function fetchTracksByArtist(artist) {
  let query = `SELECT * FROM tracks WHERE artist = ?`;
  let response = await db.all(query, [artist]);
  return { tracks: response };
}
app.get("/tracks/artist/:artist", async (req, res) => {
  try {
    let artist = req.params.artist;
    let result = await fetchTracksByArtist(artist);
    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Retrieve Tracks by Genre
 * Define the endpoint /tracks/genre/:genre to retrieve tracks by genre.
 * API call: http://localhost:3000/tracks/genre/Romantic
 */
async function fetchTracksByGenre(genre) {
  let query = `SELECT * FROM tracks WHERE genre = ?`;
  let response = await db.all(query, [genre]);
  return { tracks: response };
}
app.get("/tracks/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    let result = await fetchTracksByGenre(genre);
    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Retrieve Tracks by Release Year
 * Define the endpoint /tracks/release_year/:year to retrieve tracks by release year.
 * API call: http://localhost:3000/tracks/release_year/2019
 */
async function fetchTracksByReleaseYear(year) {
  let query = `SELECT * FROM tracks WHERE release_year = ?`;
  let response = await db.all(query, [year]);
  return { tracks: response };
}
app.get("/tracks/release_year/:year", async (req, res) => {
  try {
    let year = req.params.year;
    let result = await fetchTracksByReleaseYear(year);
    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
