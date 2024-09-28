let request = require('supertest');
const { app } = require('../index.js');
const {
  getBooks,
  getBookById,
  getReviews,
  getReviewById,
  getUserById,
} = require('../book.js');
const http = require('http');

jest.mock('../book.js', () => ({
  ...jest.requireActual('../book.js'),
  getBooks: jest.fn(),
  getBookById: jest.fn(),
  getReviews: jest.fn(),
  getReviewById: jest.fn(),
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

  it('get /api/books should  return 404 if no books  are found', async () => {
    getBooks.mockReturnValue([]);
    const result = await request(server).get('/api/books');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('No books found.');
  });

  it('get /api/books/:id should  return 404 for non-existing book', async () => {
    getBookById.mockResolvedValue(null);
    const result = await request(server).get('/api/books/898');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('Book not found');
  });

  it('get /api/reviews should  return 404 if no reviews  are found', async () => {
    getReviews.mockReturnValue([]);
    const result = await request(server).get('/api/reviews');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('No reviews found.');
  });

  it('get /api/reviews/:id should  return 404 for non-existing review', async () => {
    getReviewById.mockResolvedValue(null);
    const result = await request(server).get('/api/reviews/898');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('Review not found');
  });

  it('get /api/users/:id should  return 404 for non-existing user', async () => {
    getUserById.mockResolvedValue(null);
    const result = await request(server).get('/api/users/898');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('User not found');
  });
});
