const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let games = [
  {
    id: 1,
    title: "The Legend of Zelda",
    genre: "Adventure",
    developer: "Nintendo",
  },
  {
    id: 2,
    title: "Super Mario Bros",
    genre: "Platformer",
    developer: "Nintendo",
  },
];

let developers = [
  { id: 1, name: "Nintendo", country: "Japan" },
  { id: 2, name: "Activision", country: "USA" },
];

async function getAllGames() {
  return games;
}

async function getGameById(id) {
  return games.find((game) => game.id === id);
}

async function addGame(game) {
  game.id = games.length + 1;
  games.push(game);
  return game;
}

async function getDeveloperById(id) {
  return developers.find((developer) => developer.id === id);
}

async function addDeveloper(developer) {
  developer.id = developers.length + 1;
  developers.push(developer);
  return developer;
}

// Get All Games
app.get("/games", async (req, res) => {
  const games = await getAllGames();
  res.json(games);
});

// Get a game by ID
app.get("/games/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const game = await getGameById(id);
  if (!game) {
    return res.status(404).send("Game not found");
  }
  res.json(game);
});

// Add a new game
app.post("/games/new", async (req, res) => {
  const title = req.body.title;
  const genre = req.body.genre;
  const developer = req.body.developer;
  const newGame = await addGame({ title, genre, developer });
  res.status(201).json(newGame);
});

// Get a developer by ID
app.get("/developers/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const developer = await getDeveloperById(id);
  if (!developer) {
    return res.status(404).send("Developer not found");
  }
  res.json(developer);
});

// Add a new developer
app.post("/developers/new", async (req, res) => {
  const name = req.body.name;
  const country = req.body.country;
  const newDeveloper = await addDeveloper({ name, country });
  res.status(201).json(newDeveloper);
});

module.exports = {
  app,
  PORT,
  getAllGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper,
};
