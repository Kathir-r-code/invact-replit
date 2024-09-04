const request = require("supertest");
const {
  app,
  PORT,
  getAllReviews,
  getReviewById,
  addReview,
  getUserById,
  addUser,
} = require("../index.js");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllReviews: jest.fn(),
  getReviewById: jest.fn(),
  addReview: jest.fn(),
  getUserById: jest.fn(),
  addUser: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("api enpoint test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all reviews", async () => {
    const mockReviews = [
      { id: 1, content: "Great product!", userId: 1 },
      { id: 2, content: "Not bad, could be better.", userId: 2 },
    ];

    getAllReviews.mockResolvedValue(mockReviews);
    const result = await request(server).get("/reviews");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockReviews);
  });

  it("should get a review by id", async () => {
    const mockReview = { id: 1, content: "Great product!", userId: 1 };
    getReviewById.mockResolvedValue(mockReview);
    const result = await request(server).get("/reviews/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockReview);
  });

  it("should add an review", async () => {
    const mockReview = { id: 3, content: "Product review!", userId: 1 };
    addReview.mockResolvedValue(mockReview);
    const res = await request(server)
      .post("/reviews/new")
      .send({ content: "Product review!", userId: 1 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockReview);
  });

  it("should get a user by id", async () => {
    const mockUser = { id: 1, name: "John Doe", email: "john.doe@example.com" };
    getUserById.mockResolvedValue(mockUser);
    const result = await request(server).get("/users/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockUser);
  });

  it("should add a new user", async () => {
    const mockUser = { id: 3, name: "Doe", email: "doe@example.com" };
    addUser.mockResolvedValue(mockUser);

    const res = await request(server)
      .post("/users/new")
      .send({ name: "Doe", email: "doe@example.com" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockUser);
  });

  it("should return 404 for non-existing review", async () => {
    getReviewById.moxResolvedValue(null);
    const result = await request(server).get("/reviews/details/99");
    expect(result.statusCode).toEqual(404);
  });

  it("should return 404 for non-existing user", async () => {
    getUserById.moxResolvedValue(null);
    const result = await request(server).get("/users/details/99");
    expect(result.statusCode).toEqual(404);
  });
});
