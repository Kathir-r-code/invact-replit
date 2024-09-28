const request = require('supertest');
const { app, PORT, validateCompany, validateEmployee } = require('../index.js');
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
  it('should add a new employee with valid input', async () => {
    const res = await request(server).post('/api/employees').send({
      name: 'John Doe',
      companyId: 1,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: 'John Doe',
      companyId: 1,
    });
  });

  it('should return 400 for invalid employee input', async () => {
    const res = await request(server).post('/api/employees').send({
      name: 'John Doe',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('Company Id is required and should be a number');
  });

  it('should add a new company with valid input', async () => {
    const res = await request(server).post('/api/companies').send({
      name: 'TechCorp',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: 'TechCorp',
    });
  });

  it('should return 400 for invalid company input', async () => {
    const res = await request(server).post('/api/companies').send({
      name: 123,
    });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('Name is required and should be a string');
  });
});

describe('Validation functions', async () => {
  it('should validate employee input correctly', () => {
    expect(
      validateEmployee({
        name: 'John Doe',
        companyId: 1,
      })
    ).toBeNull();

    expect(validateEmployee({ name: 'John Doe' })).toEqual(
      'Company Id is required and should be a number'
    );

    expect(validateEmployee({ companyId: 1 })).toEqual(
      'Name is required and should be a string'
    );
  });

  it('should validate company input correctly', () => {
    expect(
      validateCompany({
        name: 'TechCorp',
      })
    ).toBeNull();

    expect(validateCompany({ name: 1234 })).toEqual(
      'Name is required and should be a string'
    );

    expect(validateCompany({})).toEqual(
      'Name is required and should be a string'
    );
  });
});
