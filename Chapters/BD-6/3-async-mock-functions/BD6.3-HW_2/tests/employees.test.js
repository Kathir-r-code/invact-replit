const request = require("supertest");
const {
  app,
  getAllEmployees,
  getEmployeeById,
  addEmployee,
} = require("../index.js");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  addEmployee: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("employees enpoint test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all employees", async () => {
    const mockEmployeesDetails = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        department: "Engineering",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        department: "Marketing",
      },
    ];

    getAllEmployees.mockResolvedValue(mockEmployeesDetails);
    const result = await request(server).get("/employees");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmployeesDetails);
  });

  it("should get a employee by id", async () => {
    const mockEmployee = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering",
    };
    getEmployeeById.mockResolvedValue(mockEmployee);
    const result = await request(server).get("/employees/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmployee);
  });

  it("should add an Employee", async () => {
    const mockEmployee = {
      id: 3,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      department: "Sales",
    };
    addEmployee.mockResolvedValue(mockEmployee);
    const res = await request(server).post("/employees/new").send({
      name: "Alice Brown",
      email: "alice.brown@example.com",
      department: "Sales",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockEmployee);
  });

  it("should return 404 for non-existing employee", async () => {
    getEmployeeById.mockResolvedValue(null);
    const result = await request(server).get("/employees/details/99");
    expect(result.statusCode).toEqual(404);
  });
});
