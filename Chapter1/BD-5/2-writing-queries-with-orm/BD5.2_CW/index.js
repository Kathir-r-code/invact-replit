let express = require("express");
let app = express();
const PORT = 3000;

let { track } = require("./models/track.model");
let { sequelize } = require("./lib/index");

let movieData = [
  {
    name: "Raabta",
    genre: "Romantic",
    release_year: 2012,
    artist: "Arijit Singh",
    album: "Agent Vinod",
    duration: 4,
  },
  {
    name: "Naina Da Kya Kasoor",
    genre: "Pop",
    release_year: 2018,
    artist: "Amit Trivedi",
    album: "Andhadhun",
    duration: 3,
  },
  {
    name: "Ghoomar",
    genre: "Traditional",
    release_year: 2018,
    artist: "Shreya Ghoshal",
    album: "Padmaavat",
    duration: 3,
  },
  {
    name: "Bekhayali",
    genre: "Rock",
    release_year: 2019,
    artist: "Sachet Tandon",
    album: "Kabir Singh",
    duration: 6,
  },
  {
    name: "Hawa Banke",
    genre: "Romantic",
    release_year: 2019,
    artist: "Darshan Raval",
    album: "Hawa Banke (Single)",
    duration: 3,
  },
  {
    name: "Ghungroo",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "War",
    duration: 5,
  },
  {
    name: "Makhna",
    genre: "Hip-Hop",
    release_year: 2019,
    artist: "Tanishk Bagchi",
    album: "Drive",
    duration: 3,
  },
  {
    name: "Tera Ban Jaunga",
    genre: "Romantic",
    release_year: 2019,
    artist: "Tulsi Kumar",
    album: "Kabir Singh",
    duration: 3,
  },
  {
    name: "First Class",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 4,
  },
  {
    name: "Kalank Title Track",
    genre: "Romantic",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 5,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await track.bulkCreate(movieData);

    res.status(200).json({ message: "DataBase seeding successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

/**
 * Exercise 1: Fetch all tracks
 */
async function fetchAllTracks() {
  let tracks = await track.findAll();
  return { tracks: tracks };
}
app.get("/tracks", async (req, res) => {
  try {
    let response = await fetchAllTracks();
    if (response.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch track details by ID
 * api call: http://localhost:3000/tracks/details/2
 */
async function fetchTrackById(id) {
  let trackData = await track.findOne({ where: { id } });
  return { track: trackData };
}
app.get("/tracks/details/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await fetchTrackById(id);
    if (!result.track) {
      return res.status(404).json({ message: "Track not found!" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch all tracks by an artist
 * API Call : http://localhost:3000/tracks/artist/Arijit%20Singh
 */
async function fetchAllTracksByArtist(artist) {
  let tracks = await track.findAll({ where: { artist } });
  return { tracks: tracks };
}
app.get("/tracks/artist/:artist", async (req, res) => {
  try {
    let artist = req.params.artist;
    let result = await fetchAllTracksByArtist(artist);
    if (!result.tracks.length === 0) {
      return res
        .status(404)
        .json({ message: `No tracks not found for artist - ${artist}!` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Sort all the tracks by their release year
 * Create an endpoint /tracks/sort/release_year that’ll return all the tracks sorted by their release year
 * API Call : http://localhost:3000/tracks/sort/release_year?order=desc
 */
async function sortTracksByReleaseYear(order) {
  let tracks = await track.findAll({ order: [["release_year", order]] });
  return { tracks: tracks };
}
app.get("/tracks/sort/release_year", async (req, res) => {
  try {
    let order = req.query.order;
    let result = await sortTracksByReleaseYear(order);
    if (!result.tracks.length === 0) {
      return res.status(404).json({ message: `No tracks not found!` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
