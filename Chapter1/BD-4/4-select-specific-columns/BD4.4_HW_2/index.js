const express = require("express");
const sqllite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename:
      "./Chapter1/BD-4/4-select-specific-columns/BD4.4_HW_2/database.sqlite",
    driver: sqllite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.4 HW2 Template" });
});

/**
 * Exercise 1: Fetch All Artworks
 * Create an endpoint /artworks to return all the artworks.
 * API Call: http://localhost:3000/artworks
 * columns: id, title & artist.
 */
async function fetchAllArtworks() {
  let query = `SELECT id, title, artist FROM artworks`;
  let response = await db.all(query, []);
  return { artworks: response };
}
app.get("/artworks", async (req, res) => {
  try {
    const results = await fetchAllArtworks();
    if (results.artworks.length === 0) {
      return res.status(404).json({ message: "No artworks found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch Artworks by Artist
 * Create an endpoint /artworks/artist/:artist to return artworks by the given artist.
 * API Call: http://localhost:3000/artworks/artist/Vincent%20Van%20Gogh
 * columns: id, title, artist & year.
 */
async function fetchArtworksByArtist(artist) {
  let query = `SELECT id, title, artist, year FROM artworks WHERE artist = ?`;
  let respose = await db.all(query, [artist]);
  return { artworks: respose };
}
app.get("/artworks/artist/:artist", async (req, res) => {
  let artist = req.params.artist;
  try {
    const results = await fetchArtworksByArtist(artist);
    if (results.artworks.length === 0) {
      return res.status(404).json({ message: "No artworks found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch Artworks by Year
 * Create an endpoint /artworks/year/:year to return artworks by the given year.
 * API Call: http://localhost:3000/artworks/year/1889
 * columns: id, title, artist & year.
 */
async function fetchArtworksByYear(year) {
  let query = `SELECT id, title, artist, year FROM artworks WHERE year = ?`;
  let respose = await db.all(query, [year]);
  return { artworks: respose };
}
app.get("/artworks/year/:year", async (req, res) => {
  let year = req.params.year;
  try {
    const results = await fetchArtworksByYear(year);
    if (results.artworks.length === 0) {
      return res.status(404).json({ message: "No artworks found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Fetch Artworks by Medium
 * Create an endpoint /artworks/medium/:medium to return artworks by the given medium.
 * API Call: http://localhost:3000/artworks/medium/Oil%20Painting
 * columns: id, title, artist & medium.
 */
async function fetchArtworksByMedium(medium) {
  let query = `SELECT id, title, artist, medium FROM artworks WHERE medium = ?`;
  let respose = await db.all(query, [medium]);
  return { artworks: respose };
}
app.get("/artworks/medium/:medium", async (req, res) => {
  let medium = req.params.medium;
  try {
    const results = await fetchArtworksByMedium(medium);
    if (results.artworks.length === 0) {
      return res.status(404).json({ message: "No artworks found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
