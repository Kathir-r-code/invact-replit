const express = require("express");
const { resolve } = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("static"));
app.use(express.json());

let recipes = [
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

async function getAllRecipes() {
  return recipes;
}

async function getRecipeById(id) {
  return recipes.find((recipe) => recipe.id === id);
}

async function addRecipe(recipe) {
  recipe.id = recipes.length + 1;
  recipes.push(recipe);
  return recipe;
}

// Get All recipes
app.get("/recipes", async (req, res) => {
  const recipes = await getAllRecipes();
  res.json(recipes);
});

// Get a recipe by ID
app.get("/recipes/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = await getRecipeById(id);
  if (!recipe) {
    return res.status(404).send("Recipe not found");
  }
  res.json(recipe);
});

// Add a new recipe
app.post("/recipes/new", async (req, res) => {
  const name = req.body.name;
  const cuisine = req.body.cuisine;
  const difficulty = req.body.difficulty;
  const newRecipe = await addRecipe({ name, cuisine, difficulty });
  res.status(201).json(newRecipe);
});

module.exports = {
  app,
  PORT,
  getAllRecipes,
  getRecipeById,
  addRecipe,
};
