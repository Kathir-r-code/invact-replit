const express = require('express');
const { resolve } = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

let games = [];

function validateGame(game) {
  if (!game.title || typeof game.title !== 'string') {
    return 'Title is required and should be a string';
  }
  if (!game.genre || typeof game.genre !== 'string') {
    return 'Genre is required and should be a string';
  }

  return null;
}

app.post('/api/games', (req, res) => {
  let error = validateGame(req.body);
  if (error) {
    res.status(400).send(error);
  }
  let game = { id: games.length + 1, ...req.body };
  games.push(game);
  res.status(201).json(game);
});

let tournaments = [];

function validateTournament(tournament) {
  if (!tournament.name || typeof tournament.name !== 'string') {
    return 'Name is required and should be a string';
  }
  if (!tournament.gameId || typeof tournament.gameId !== 'number') {
    return 'Game Id is required and should be a number';
  }
  return null;
}
app.post('/api/tournaments', (req, res) => {
  let error = validateTournament(req.body);
  if (error) {
    res.status(400).send(error);
  }
  let tournament = { id: tournaments.length + 1, ...req.body };
  tournaments.push(tournament);
  res.status(201).json(tournament);
});

module.exports = { app, PORT, validateGame, validateTournament };
