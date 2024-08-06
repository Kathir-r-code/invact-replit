const express = require("express");
const sqllite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./Chapter1/BD-4/6-assignments/BD4-assignment-1/database.sqlite",
    driver: sqllite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4 - Assignment-1 Template" });
});

/**
 * Exercise 1: Get All Restaurants
 * Objective: Fetch all restaurants from the database.
 * Example Call: http://localhost:3000/restaurants
 */
async function fetchAllRestaurants() {
  let query = "SELECT * FROM restaurants";
  let response = await db.all(query, []);
  return { restaurants: response };
}

app.get("/restaurants", async (req, res) => {
  try {
    let results = await fetchAllRestaurants();
    if (results.restaurants.length === 0) {
      return res.status(404).json({
        message: `No restaurants found.`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Get Restaurant by ID
 * Objective: Fetch a specific restaurant by its ID.
 * Example Call: http://localhost:3000/restaurants/details/1
 */
async function fetchRestaurantById(id) {
  let query = "SELECT * FROM restaurants WHERE  id = ?";
  let response = await db.get(query, [id]);
  return { restaurant: response };
}

app.get("/restaurants/details/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let results = await fetchRestaurantById(id);
    if (results.restaurant === undefined) {
      return res.status(404).json({
        message: `No restaurant found with id - ${id}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Get Restaurants by Cuisine
 * Objective: Fetch restaurants based on their cuisine.
 * Example Call: http://localhost:3000/restaurants/cuisine/Indian
 */
async function fetchRestaurantsByCuisine(cuisine) {
  let query = "SELECT * FROM restaurants WHERE cuisine = ?";
  let response = await db.all(query, [cuisine]);
  return { restaurants: response };
}

app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    let results = await fetchRestaurantsByCuisine(cuisine);
    if (results.restaurants.length === 0) {
      return res.status(404).json({
        message: `No restaurants have ${cuisine} cuisine`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Get Restaurants by Filter
 * Objective: Fetch restaurants based on filters such as veg/non-veg, outdoor seating, luxury, etc.
 * Example Call: http://localhost:3000/restaurants/filter?isVeg=true&hasOutdoorSeating=true&isLuxury=false
 */
async function filterRestaurantsByQuery(isVeg, hasOutdoorSeating, isLuxury) {
  let query =
    "SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?";
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
}

app.get("/restaurants/filter", async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;
  try {
    let results = await filterRestaurantsByQuery(
      isVeg,
      hasOutdoorSeating,
      isLuxury,
    );
    if (results.restaurants.length === 0) {
      return res.status(404).json({
        message: `No restaurants found. `,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 5: Get Restaurants Sorted by Rating
 * Objective: Fetch restaurants sorted by their rating ( highest to lowest ).
 * Example Call: http://localhost:3000/restaurants/sort-by-rating
 */
async function restaurantsSortByRating() {
  let query = "SELECT * FROM restaurants ORDER BY rating DESC";
  let response = await db.all(query, []);
  return { restaurants: response };
}

app.get("/restaurants/sort-by-rating", async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;
  try {
    let results = await restaurantsSortByRating();
    if (results.restaurants.length === 0) {
      return res.status(404).json({
        message: `No restaurants found. `,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 6: Get All Dishes
 * Objective: Fetch all dishes from the database.
 * Example Call: http://localhost:3000/dishes
 */
async function fetchAllDishes() {
  let query = "SELECT * FROM dishes";
  let response = await db.all(query, []);
  return { dishes: response };
}

app.get("/dishes", async (req, res) => {
  try {
    let results = await fetchAllDishes();
    if (results.dishes.length === 0) {
      return res.status(404).json({
        message: `No dishes found.`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 7: Get Dish by ID
 * Objective: Fetch a specific dish by its ID.
 * Example Call: http://localhost:3000/dishes/details/1
 */
async function fetchDishById(id) {
  let query = "SELECT * FROM dishes WHERE  id = ?";
  let response = await db.get(query, [id]);
  return { dish: response };
}

app.get("/dishes/details/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let results = await fetchDishById(id);
    if (results.dish === undefined) {
      return res.status(404).json({
        message: `No dish found with id - ${id}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 8: Get Dishes by Filter
 * Objective: Fetch dishes based on filters such as veg/non-veg.
 * Example Call: http://localhost:3000/dishes/filter?isVeg=true
 */
async function filterDishesByQuery(isVeg) {
  let query = "SELECT * FROM dishes WHERE isVeg = ?";
  let response = await db.all(query, [isVeg]);
  return { dishes: response };
}

app.get("/dishes/filter", async (req, res) => {
  let isVeg = req.query.isVeg;
  try {
    let results = await filterDishesByQuery(isVeg);
    if (results.dishes.length === 0) {
      return res.status(404).json({
        message: `No dishes found. `,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 9: Get Dishes Sorted by Price
 * Objective: Fetch dishes sorted by their price ( lowest to highest ).
 * Example Call: http://localhost:3000/dishes/sort-by-price
 */
async function sortDishesByPriceAsc() {
  let query = "SELECT * FROM dishes ORDER BY price ASC";
  let response = await db.all(query, []);
  return { dishes: response };
}

app.get("/dishes/sort-by-price", async (req, res) => {
  try {
    let results = await sortDishesByPriceAsc();
    if (results.dishes.length === 0) {
      return res.status(404).json({
        message: `No dishes found. `,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
