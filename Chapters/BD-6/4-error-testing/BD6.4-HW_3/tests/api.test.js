let request = require('supertest');
const { app } = require('../index.js');
const {
  getArticles,
  getArticleById,
  getComments,
  getCommentById,
  getUserById,
} = require('../article.js');
const http = require('http');

jest.mock('../article.js', () => ({
  ...jest.requireActual('../article.js'),
  getArticles: jest.fn(),
  getArticleById: jest.fn(),
  getComments: jest.fn(),
  getCommentById: jest.fn(),
  getUserById: jest.fn(),
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

  it('get /api/articles should  return 404 if no articles  are found', async () => {
    getArticles.mockReturnValue([]);
    const result = await request(server).get('/api/articles');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('No articles found.');
  });

  it('get /api/articles/:id should  return 404 for non-existing article', async () => {
    getArticleById.mockResolvedValue(null);
    const result = await request(server).get('/api/articles/898');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('Article not found.');
  });

  it('get /api/comments should return 404 if no comments  are found', async () => {
    getComments.mockReturnValue([]);
    const result = await request(server).get('/api/comments');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('No comments found.');
  });

  it('get /api/comments/:id should  return 404 for non-existing comment', async () => {
    getCommentById.mockResolvedValue(null);
    const result = await request(server).get('/api/comments/898');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('Comment not found.');
  });

  it('get /api/users/:id should  return 404 for non-existing user', async () => {
    getUserById.mockResolvedValue(null);
    const result = await request(server).get('/api/users/898');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('User not found.');
  });
});
