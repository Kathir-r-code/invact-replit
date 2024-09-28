let request = require('supertest');
const { app } = require('../index.js');
const {
  getEmployees,
  getEmployeeById,
  getDepartments,
  getDepartmentById,
} = require('../employee.js');
const http = require('http');

jest.mock('../employee.js', () => ({
  ...jest.requireActual('../employee.js'),
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  getDepartments: jest.fn(),
  getDepartmentById: jest.fn(),
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

  it('get /api/employees should  return 404 if no employees  are found', async () => {
    getEmployees.mockReturnValue([]);
    const result = await request(server).get('/api/employees');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('No employees found.');
  });

  it('get /api/employees/:id should  return 404 for non-existing employee', async () => {
    getEmployeeById.mockResolvedValue(null);
    const result = await request(server).get('/api/employees/898');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('Employee not found.');
  });

  it('get /api/departments should return 404 if no departments  are found', async () => {
    getDepartments.mockReturnValue([]);
    const result = await request(server).get('/api/departments');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('No departments found.');
  });

  it('get /api/departments/:id should  return 404 for non-existing department', async () => {
    getDepartmentById.mockResolvedValue(null);
    const result = await request(server).get('/api/departments/898');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('Department not found.');
  });
});
