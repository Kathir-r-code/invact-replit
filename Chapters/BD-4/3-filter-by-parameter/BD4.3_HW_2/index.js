const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename:
      "./Chapters/BD-4/3-filter-by-parameter/BD4.3_HW_2/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3 HW2 Template" });
});

/**
 * Exercise 1: Fetch All Recipes by Cuisine
 * Create an endpoint /recipes/cuisine/:cuisine to return all recipes of a specific cuisine.
 * API Call: <http://localhost:3000/recipes/cuisine/Italian> - filterByCuisine
 */
async function filterByCuisine(cuisine) {
  let query = `SELECT * FROM recipes WHERE cuisine = ?`;
  let response = await db.all(query, [cuisine]);
  return { recipes: response };
}
app.get("/recipes/cuisine/:cuisine", async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    const results = await filterByCuisine(cuisine);
    if (results.recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch All Recipes by Main Ingredient
 * Create an endpoint /recipes/main_ingredient/:main_ingredient to return all recipes with a specific main ingredient.
 * API Call: <http://localhost:3000/recipes/main_ingredient/Chicken> - filterByMainIngredient
 */
async function filterByMainIngredient(mainIngredient) {
  let query = `SELECT * FROM recipes WHERE main_ingredient = ?`;
  let response = await db.all(query, [mainIngredient]);
  return { recipes: response };
}
app.get("/recipes/main_ingredient/:main_ingredient", async (req, res) => {
  let main_ingredient = req.params.main_ingredient;
  try {
    const results = await filterByMainIngredient(main_ingredient);
    if (results.recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch All Recipes by Preparation Time
 * Create an endpoint /recipes/preparation_time/:preparation_time to return all recipes with a preparation time less than or equal to a specific value.
 * API Call: <http://localhost:3000/recipes/preparation_time/30> - filterByPreparationTime
 */
async function filterByPreparationTime(preparationTime) {
  let query = `SELECT * FROM recipes WHERE preparation_time <= ?`;
  let response = await db.all(query, [preparationTime]);
  return { recipes: response };
}
app.get("/recipes/preparation_time/:preparation_time", async (req, res) => {
  let preparation_time = req.params.preparation_time;
  try {
    const results = await filterByPreparationTime(preparation_time);
    if (results.recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Fetch All Recipes by Difficulty
 * Create an endpoint /recipes/difficulty/:difficulty to return all recipes of a specific difficulty level.
 * API Call: <http://localhost:3000/recipes/difficulty/Easy> - filterByDifficulty
 */
async function filterByDifficulty(difficulty) {
  let query = `SELECT * FROM recipes WHERE difficulty = ?`;
  let response = await db.all(query, [difficulty]);
  return { recipes: response };
}
app.get("/recipes/difficulty/:difficulty", async (req, res) => {
  let difficulty = req.params.difficulty;
  try {
    const results = await filterByDifficulty(difficulty);
    if (results.recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 5: Fetch All Recipes by Vegetarian Status
 * Create an endpoint /recipes/vegetarian/:vegetarian to return all recipes based on vegetarian status.
 * API Call: <http://localhost:3000/recipes/vegetarian/true>
 */
async function filterByVegetarian(vegetarian) {
  let query = `SELECT * FROM recipes WHERE vegetarian = ?`;
  let response = await db.all(query, [vegetarian]);
  return { recipes: response };
}
app.get("/recipes/vegetarian/:vegetarian", async (req, res) => {
  let vegetarian = req.params.vegetarian;
  try {
    const results = await filterByVegetarian(vegetarian);
    if (results.recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
