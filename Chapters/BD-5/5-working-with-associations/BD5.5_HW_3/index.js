let express = require("express");
let app = express();
const PORT = 3000;

let { recipe } = require("./models/recipe.model");
let { user } = require("./models/user.model");
let { favorite } = require("./models/favorite.model");
let { sequelize } = require("./lib/index");
let { Op } = require("@sequelize/core");
app.use(express.json());

let recipeData = [
  {
    title: "Spaghetti Carbonara",
    chef: "Chef Luigi",
    cuisine: "Italian",
    preparationTime: 30,
    instructions:
      "Cook spaghetti. In a bowl, mix eggs, cheese, and pepper. Combine with pasta and pancetta.",
  },
  {
    title: "Chicken Tikka Masala",
    chef: "Chef Anil",
    cuisine: "Indian",
    preparationTime: 45,
    instructions:
      "Marinate chicken in spices and yogurt. Grill and serve with a creamy tomato sauce.",
  },
  {
    title: "Sushi Roll",
    chef: "Chef Sato",
    cuisine: "Japanese",
    preparationTime: 60,
    instructions:
      "Cook sushi rice. Place rice on nori, add fillings, roll, and slice into pieces.",
  },
  {
    title: "Beef Wellington",
    chef: "Chef Gordon",
    cuisine: "British",
    preparationTime: 120,
    instructions:
      "Wrap beef fillet in puff pastry with mushroom duxelles and bake until golden.",
  },
  {
    title: "Tacos Al Pastor",
    chef: "Chef Maria",
    cuisine: "Mexican",
    preparationTime: 50,
    instructions:
      "Marinate pork in adobo, grill, and serve on tortillas with pineapple and cilantro.",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await user.create({
      username: "foodlover",
      email: "foodlover@example.com",
      password: "securepassword",
    });
    await recipe.bulkCreate(recipeData);

    res.status(200).json({ message: "DataBase seeding successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

/**
 * Exercise 1: Favorite a Recipe
 * Create an endpoint /users/:id/favorite that will create a new author record in the database.
 * API Call: http://localhost:3000/users/1/favorite?recipeId=2
 */
async function favoriteRecipe(data) {
  let newFavorite = await favorite.create({
    userId: data.userId,
    recipeId: data.recipeId,
  });
  return { message: "Recipe favorited", newFavorite };
}
app.get("/users/:id/favorite", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let recipeId = parseInt(req.query.recipeId);
    let response = await favoriteRecipe({ userId, recipeId });
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Unfavorite a Recipe
 * Create an endpoint /users/:id/unfavorite that will allow a user to unfavorite a recipe.
 * API Call: http://localhost:3000/users/1/unfavorite?recipeId=2
 */
async function unfavoriteRecipe(data) {
  let count = await favorite.destroy({
    where: {
      userId: data.userId,
      recipeId: data.recipeId,
    },
  });
  if (count === 0) {
    return {};
  }
  return { message: "Recipe unfavorited" };
}
app.get("/users/:id/unfavorite", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let recipeId = parseInt(req.query.recipeId);
    let response = await unfavoriteRecipe({ userId, recipeId });
    if (!response.message) {
      return res
        .status(404)
        .json({ message: "This recipe is not in ur favourite list!" });
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Get All Favorited Recipes
 * Create an endpoint /users/:id/favorites that will fetch all favorited recipes of a user.
 * API Call: http://localhost:3000/users/1/favorites
 */
async function getAllFavoritedRecipes(userId) {
  let recipeIds = await favorite.findAll({
    where: {
      userId,
    },
    attributes: ["recipeId"],
  });
  let recipeRecords = [];
  for (let i = 0; i < recipeIds.length; i++) {
    recipeRecords.push(recipeIds[i].recipeId);
  }

  let favoritedRecipes = await recipe.findAll({
    where: { id: { [Op.in]: recipeRecords } },
  });
  return { favoritedRecipes };
}
app.get("/users/:id/favorites", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let response = await getAllFavoritedRecipes(userId);
    if (response.favoritedRecipes.length === 0) {
      return res.status(404).json({ message: "No favorite recipes found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
