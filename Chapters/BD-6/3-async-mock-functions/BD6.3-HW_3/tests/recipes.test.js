const request = require("supertest");
const { app, getAllRecipes, getRecipeById, addRecipe } = require("../index.js");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllRecipes: jest.fn(),
  getRecipeById: jest.fn(),
  addRecipe: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("recipes enpoint test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all recipes", async () => {
    const mockRecipes = [
      {
        id: 1,
        name: "Spaghetti Bolognese",
        cuisine: "Italian",
        difficulty: "Medium",
      },
      {
        id: 2,
        name: "Chicken Tikka Masala",
        cuisine: "Indian",
        difficulty: "Hard",
      },
    ];

    getAllRecipes.mockResolvedValue(mockRecipes);
    const result = await request(server).get("/recipes");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockRecipes);
  });

  it("should get a recipe by id", async () => {
    const mockRecipe = {
      id: 1,
      name: "Spaghetti Bolognese",
      cuisine: "Italian",
      difficulty: "Medium",
    };
    getRecipeById.mockResolvedValue(mockRecipe);
    const result = await request(server).get("/recipes/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockRecipe);
  });

  it("should add an Recipe", async () => {
    const mockRecipe = {
      id: 3,
      name: "Sushi",
      cuisine: "Japanese",
      difficulty: "Hard",
    };
    addRecipe.mockResolvedValue(mockRecipe);
    const res = await request(server).post("/recipes/new").send({
      name: "Sushi",
      cuisine: "Japanese",
      difficulty: "Hard",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockRecipe);
  });

  it("should return 404 for non-existing recipe", async () => {
    getRecipeById.mockResolvedValue(null);
    const result = await request(server).get("/recipes/details/99");
    expect(result.statusCode).toEqual(404);
  });
});
