const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
const { getMovies, getMovieById, addMovie } = require("./movie");

app.get("/movies", (req, res) => {
  res.json(getMovies());
});

app.get("/movies/:id", (req, res) => {
  const movie = getMovieById(parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ message: "movie not found" });
  }
  res.json(movie);
});

app.post("/movies", (req, res) => {
  const movie = addMovie(req.body);
  res.status(201).json(movie);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
