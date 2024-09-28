let request = require('supertest');
const { app } = require('../index.js');
const {
  getGames,
  getGameById,
  getGenres,
  getGenreById,
} = require('../game.js');
const http = require('http');

jest.mock('../game.js', () => ({
  ...jest.requireActual('../game.js'),
  getGames: jest.fn(),
  getGameById: jest.fn(),
  getGenres: jest.fn(),
  getGenreById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('API error handling test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get /api/games should  return 404 if no games  are found', async () => {
    getGames.mockReturnValue([]);
    const result = await request(server).get('/api/games');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('No games found.');
  });

  it('get /api/games/:id should  return 404 for non-existing game', async () => {
    getGameById.mockResolvedValue(null);
    const result = await request(server).get('/api/games/898');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('Game not found.');
  });

  it('get /api/genres should return 404 if no genres  are found', async () => {
    getGenres.mockReturnValue([]);
    const result = await request(server).get('/api/genres');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('No genres found.');
  });

  it('get /api/genres/:id should  return 404 for non-existing genre', async () => {
    getGenreById.mockResolvedValue(null);
    const result = await request(server).get('/api/genres/898');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('Genre not found.');
  });
});
