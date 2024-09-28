const request = require('supertest');
const { app, PORT, validateArticle, validateAuthor } = require('../index.js');
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
  it('should add a new article with valid input', async () => {
    const res = await request(server).post('/articles').send({
      title: 'Mastering Node.js',
      content: 'Node.js is a powerful tool for backend development...',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 3,
      title: 'Mastering Node.js',
      content: 'Node.js is a powerful tool for backend development...',
    });
  });

  it('should return 400 for invalid article input', async () => {
    const res = await request(server).post('/articles').send({
      title: 'Mastering Node.js',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('Content is required and should be a string');
  });

  it('should add a new author with valid input', async () => {
    const res = await request(server).post('/authors').send({
      name: 'Alice Johnson',
      articleId: 3,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 3,
      name: 'Alice Johnson',
      articleId: 3,
    });
  });

  it('should return 400 for invalid author input', async () => {
    const res = await request(server).post('/authors').send({
      name: 'Alice Johnson',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('Article Id is required and should be a number');
  });
});

describe('Validation functions', async () => {
  it('should validate article input correctly', () => {
    expect(
      validateArticle({
        title: 'Mastering Node.js',
        content: 'Node.js is a powerful tool for backend development...',
      })
    ).toBeNull();

    expect(validateArticle({ title: 'Mastering Node.js' })).toEqual(
      'Content is required and should be a string'
    );

    expect(
      validateArticle({
        content: 'Node.js is a powerful tool for backend development...',
      })
    ).toEqual('Title is required and should be a string');
  });

  it('should validate author input correctly', () => {
    expect(
      validateAuthor({
        name: 'Alice Johnson',
        articleId: 3,
      })
    ).toBeNull();

    expect(validateAuthor({ name: 'Alice Johnson' })).toEqual(
      'Article Id is required and should be a number'
    );

    expect(validateAuthor({ articleId: 3 })).toEqual(
      'Name is required and should be a string'
    );
  });
});
