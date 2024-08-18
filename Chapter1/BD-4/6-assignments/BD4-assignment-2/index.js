const express = require("express");
const sqllite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
let db;

// Connect to SQLite database
(async () => {
  db = await open({
    filename: "./Chapter1/BD-4/6-assignments/BD4-assignment-2/database.sqlite",
    driver: sqllite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4 - Assignment-2 Template" });
});

/**
 * Exercise 1: Get All Games
 * Objective: Fetch all games from the database.
 * Example Call: http://localhost:3000/games
 */
async function fetchAllGames() {
  let query = "SELECT * FROM games";
  let response = await db.all(query, []);
  return { games: response };
}
app.get("/games", async (req, res) => {
  try {
    const results = await fetchAllGames();
    if (results.games.length === 0) {
      return res.status(404).json({
        message: `No games found.`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Get Game by ID
 * Objective: Fetch a specific game by its ID.
 * Example Call: http://localhost:3000/games/details/1
 */
async function fetchGameById(id) {
  let query = "SELECT * FROM games WHERE id = ?";
  let response = await db.get(query, [id]);
  return { game: response };
}
app.get("/games/details/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const result = await fetchGameById(id);
    if (result.game === undefined) {
      return res.status(404).json({
        message: `No game found with id - ${id}`,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Get Games by Genre
 * Objective: Fetch games based on their genre.
 * Example Call: http://localhost:3000/games/genre/FPS
 */
async function fetchGamesByGenre(genre) {
  let query = "SELECT * FROM games WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { games: response };
}
app.get("/games/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  try {
    let results = await fetchGamesByGenre(genre);
    if (results.games.length === 0) {
      return res.status(404).json({
        message: `No games found with genre - ${genre}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Get Games by Platform
 * Objective: Fetch games based on their platform.
 * Example Call: http://localhost:3000/games/platform/PC
 */
async function fetchGamesByPlatform(platform) {
  let query = "SELECT * FROM games WHERE platform = ?";
  let response = await db.all(query, [platform]);
  return { games: response };
}
app.get("/games/platform/:platform", async (req, res) => {
  let platform = req.params.platform;
  try {
    let results = await fetchGamesByPlatform(platform);
    if (results.games.length === 0) {
      return res.status(404).json({
        message: `No games found in the ${platform} platform`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 5: Get Games Sorted by Rating
 * Objective: Fetch games sorted by their rating ( highest to lowest ).
 * Example Call: http://localhost:3000/games/sort-by-rating
 */
async function fetchGamesByRatingDesc() {
  let query = "SELECT * FROM games ORDER BY rating DESC";
  let response = await db.all(query, []);
  return { games: response };
}
app.get("/games/sort-by-rating", async (req, res) => {
  try {
    let results = await fetchGamesByRatingDesc();
    if (results.games.length === 0) {
      return res.status(404).json({
        message: `No games found.`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 6: Get All Players
 * Objective: Fetch all players from the database.
 * Example Call: http://localhost:3000/players
 */
async function fetchAllPlayers() {
  let query = "SELECT * FROM players";
  let response = await db.all(query, []);
  return { players: response };
}
app.get("/players", async (req, res) => {
  try {
    const results = await fetchAllPlayers();
    if (results.players.length === 0) {
      return res.status(404).json({
        message: `No players found.`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 7: Get Player by ID
 * Objective: Fetch a specific player by their ID.
 * Example Call: http://localhost:3000/players/details/1
 */
async function fetchPlayerById(id) {
  let query = "SELECT * FROM players WHERE id = ?";
  let response = await db.get(query, [id]);
  return { player: response };
}
app.get("/players/details/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const result = await fetchPlayerById(id);
    if (result.player === undefined) {
      return res.status(404).json({
        message: `No player found with id - ${id}`,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 8: Get Players by Platform
 * Objective: Fetch players based on their platform.
 * Example Call: http://localhost:3000/players/platform/PC
 */
async function fetchPlayersByPlatform(platform) {
  let query = "SELECT * FROM players WHERE platform = ?";
  let response = await db.all(query, [platform]);
  return { players: response };
}
app.get("/players/platform/:platform", async (req, res) => {
  let platform = req.params.platform;
  try {
    let results = await fetchPlayersByPlatform(platform);
    if (results.players.length === 0) {
      return res.status(404).json({
        message: `No players found in the ${platform} platform`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 9: Get Players Sorted by Rating
 * Objective: Fetch players sorted by their rating ( highest to lowest ).
 * Example Call: http://localhost:3000/players/sort-by-rating
 */
async function fetchPlayersByRatingDesc() {
  let query = "SELECT * FROM players ORDER BY rating DESC";
  let response = await db.all(query, []);
  return { players: response };
}
app.get("/players/sort-by-rating", async (req, res) => {
  try {
    let results = await fetchPlayersByRatingDesc();
    if (results.players.length === 0) {
      return res.status(404).json({
        message: `No players found.`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 10: Get All Tournaments
 * Objective: Fetch all tournaments from the database.
 * Example Call: http://localhost:3000/tournaments
 */
async function fetchAllTournaments() {
  let query = "SELECT * FROM tournaments";
  let response = await db.all(query, []);
  return { tournaments: response };
}
app.get("/tournaments", async (req, res) => {
  try {
    const results = await fetchAllTournaments();
    if (results.tournaments.length === 0) {
      return res.status(404).json({
        message: `No tournaments found.`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 11: Get Tournament by ID
 * Objective: Fetch a specific tournament by its ID.
 * Example Call: http://localhost:3000/tournaments/details/1
 */
async function fetchTournamentById(id) {
  let query = "SELECT * FROM tournaments WHERE id = ?";
  let response = await db.get(query, [id]);
  return { tournament: response };
}
app.get("/tournaments/details/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const result = await fetchTournamentById(id);
    if (result.tournament === undefined) {
      return res.status(404).json({
        message: `No tournament found with id - ${id}`,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 12: Get Tournaments by Game ID
 * Objective: Fetch tournaments based on their game ID.
 * Example Call: http://localhost:3000/tournaments/game/1
 */
async function fetchTournamentsByGameId(id) {
  let query = "SELECT * FROM tournaments WHERE gameId = ?";
  let response = await db.all(query, [id]);
  return { tournaments: response };
}
app.get("/tournaments/game/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let results = await fetchTournamentsByGameId(id);
    if (results.tournaments.length === 0) {
      return res.status(404).json({
        message: `No tournaments found for the game with id - ${id}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 13: Get Tournaments Sorted by Prize Pool
 * Objective: Fetch tournaments sorted by their prize pool ( highest to lowest ).
 * Example Call: http://localhost:3000/tournaments/sort-by-prize-pool
 */
async function fetchTournamentsByPrizePoolDesc() {
  let query = "SELECT * FROM tournaments ORDER BY prizePool DESC";
  let response = await db.all(query, []);
  return { tournaments: response };
}
app.get("/tournaments/sort-by-prize-pool", async (req, res) => {
  try {
    let results = await fetchTournamentsByPrizePoolDesc();
    if (results.tournaments.length === 0) {
      return res.status(404).json({
        message: `No tournaments found.`,
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
