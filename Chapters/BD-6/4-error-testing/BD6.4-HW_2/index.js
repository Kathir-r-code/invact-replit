let { getGames, getGameById, getGenres, getGenreById } = require('./game');
const express = require('express');
const { resolve } = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Get All games
app.get('/api/games', async (req, res) => {
  try {
    const games = await getGames();
    if (games.length === 0) {
      return res.status(404).json({ error: 'No games found.' });
    }
    return res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a game by ID
app.get('/api/games/:id', async (req, res) => {
  try {
    const game = await getGameById(parseInt(req.params.id));
    if (!game) {
      return res.status(404).json({ error: 'Game not found.' });
    }
    return res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get All genres
app.get('/api/genres', async (req, res) => {
  try {
    const genres = await getGenres();
    if (genres.length === 0) {
      return res.status(404).json({ error: 'No genres found.' });
    }
    return res.json(genres);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a genre by ID
app.get('/api/genres/:id', async (req, res) => {
  try {
    const genre = await getGenreById(parseInt(req.params.id));
    if (!genre) {
      return res.status(404).json({ error: 'Genre not found.' });
    }
    return res.json(genre);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = { app, PORT };
