let { app, getMovies, getMovieById, addMovie } = require("../index.js");

let http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual(`../index.js`),
  getMovies: jest.fn(),
  getMovieById: jest.fn(),
  addMovie: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("movies function test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getMovies should return a list of movies", () => {
    let mockMovies = [
      { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
      { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
    ];
    getMovies.mockReturnValue(mockMovies);
    let result = getMovies();
    expect(result).toEqual(mockMovies);
    expect(getMovies).toHaveBeenCalled();
  });

  test("getMovieById should return an movie details by id", () => {
    let mockMovie = {
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
    };
    getMovieById.mockReturnValue(mockMovie);
    let result = getMovieById(1);
    expect(result).toEqual(mockMovie);
    expect(getMovieById).toHaveBeenCalledWith(1);
  });

  test("getMovieById should return undefined if movie id not found", () => {
    getMovieById.mockReturnValue(undefined);
    let result = getMovieById(999);
    expect(result).toBeUndefined();
    expect(getMovieById).toHaveBeenCalledWith(999);
  });

  test("addmovie should add a new movie", () => {
    let newMovie = {
      id: 4,
      title: "GOAT",
      director: "V Prabhu",
    };
    addMovie.mockReturnValue(newMovie);
    let result = addMovie(newMovie);
    expect(result).toEqual(newMovie);
    expect(addMovie).toHaveBeenCalledWith(newMovie);
  });
});
