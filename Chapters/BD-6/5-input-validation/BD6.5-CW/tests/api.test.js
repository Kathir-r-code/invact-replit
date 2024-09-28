const request = require('supertest');
const {
  app,
  PORT,
  validateBook,
  validateUser,
  validateReview,
} = require('../index.js');
const http = require('http');
const { describe } = require('node:test');

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('API endpoint to add data', () => {
  it('should add a new user with valid input', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({ name: 'John Doe', email: 'johndoe@gmail.com' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
    });
  });

  it('should return 400 for invalid user input', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({ name: 'John Doe' });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('Email is required and should be a string');
  });

  it('should add a new book with valid input', async () => {
    const res = await request(server)
      .post('/api/books')
      .send({ title: 'The Alchemist', author: 'Paulo Coelho' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
    });
  });

  it('should return 400 for invalid book input', async () => {
    const res = await request(server)
      .post('/api/books')
      .send({ title: 'The Alchemist' });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('Author is required and should be a string');
  });

  it('should add a new review with valid input', async () => {
    const res = await request(server)
      .post('/api/reviews')
      .send({ content: 'All Good', userId: 1 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      content: 'All Good',
      userId: 1,
    });
  });

  it('should return 400 for invalid review input', async () => {
    const res = await request(server)
      .post('/api/reviews')
      .send({ content: 'All Good' });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('User Id is required and should be a number');
  });
});

describe('Validation functions', async () => {
  it('should validate user input correctly', () => {
    expect(
      validateUser({ name: 'John Doe', email: 'johndoe@gmail.com' })
    ).toBeNull();

    expect(validateUser({ name: 'John Doe' })).toEqual(
      'Email is required and should be a string'
    );

    expect(validateUser({ email: 'johndoe@gmail.com' })).toEqual(
      'Name is required and should be a string'
    );
  });

  it('should validate book  input correctly', () => {
    expect(
      validateBook({ title: 'The Alchemist', author: 'Paulo Coelho' })
    ).toBeNull();

    expect(validateBook({ title: 'The Alchemist' })).toEqual(
      'Author is required and should be a string'
    );

    expect(validateBook({ author: 'Paulo Coelho' })).toEqual(
      'Title is required and should be a string'
    );
  });

  it('should validate review  input correctly', () => {
    expect(validateReview({ content: 'All Good', userId: 1 })).toBeNull();

    expect(validateReview({ content: 'All Good' })).toEqual(
      'User Id is required and should be a number'
    );

    expect(validateReview({ userId: 1 })).toEqual(
      'Content is required and should be a string'
    );
  });
});
