const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let movies = [
  { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
  { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
  { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
];

function getMovies() {
  return movies;
}

function getMovieById(id) {
  return movies.find((movie) => movie.id === id);
}

function addMovie(movie) {
  movies.push(movie);
  return movie;
}

app.get("/movies", (req, res) => {
  res.json(getMovies());
});

app.get("/movies/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = getMovieById(id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

app.post("/movies/new", (req, res) => {
  let newMovie = req.body;
  let addedMovie = addMovie(newMovie);
  res.status(201).json(addedMovie);
});

module.exports = {
  app,
  PORT,
  getMovies,
  getMovieById,
  addMovie,
};