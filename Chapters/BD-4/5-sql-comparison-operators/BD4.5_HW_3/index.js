const express = require("express");
const sqllite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename:
      "./Chapters/BD-4/5-sql-comparison-operators/BD4.5_HW_3/database.sqlite",
    driver: sqllite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.5 HW3 Template" });
});

// For reference
async function getAllKitchenItems() {
  let query = `SELECT * FROM kitchen_items`;
  let response = await db.all(query, []);
  return { kitchenItems: response };
}
app.get("/kitchen-items", async (req, res) => {
  try {
    const results = await getAllKitchenItems();
    if (results.kitchenItems.length === 0) {
      return res.status(404).json({
        message: `No kitchenItems found `,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 1: Fetch Kitchen Items by Minimum Rating
 * Create an endpoint /kitchen-items/rating to return kitchen-items with a rating greater than a specified value.
 * API Call: http://localhost:3000/kitchen-items/rating?minRating=4
 */
async function filterKitchenItemsByRating(minRating) {
  let query = `SELECT * FROM kitchen_items WHERE rating > ?`;
  let response = await db.all(query, [minRating]);
  return { kitchenItems: response };
}
app.get("/kitchen-items/rating", async (req, res) => {
  let minRating = req.query.minRating;
  try {
    const results = await filterKitchenItemsByRating(minRating);
    if (results.kitchenItems.length === 0) {
      return res.status(404).json({
        message: `No kitchenItems found with minimum rating of ${minRating}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch Kitchen Items by Material and Rating
 * Create an endpoint /kitchen-items/material-rating to return kitchen items of a specified material with a rating above a specified value.
 * API Call: http://localhost:3000/kitchen-items/material-rating?material=plastic&minRating=3
 */
async function filterKitchenItemsByMaterialRating(material, minRating) {
  let query = `SELECT * FROM kitchen_items WHERE material = ? AND rating >= ?`;
  let response = await db.all(query, [material, minRating]);
  return { kitchenItems: response };
}
app.get("/kitchen-items/material-rating", async (req, res) => {
  let material = req.query.material;
  let minRating = req.query.minRating;
  try {
    const results = await filterKitchenItemsByMaterialRating(
      material,
      minRating,
    );
    if (results.kitchenItems.length === 0) {
      return res.status(404).json({
        message: `No kitchenItems found with material - ${material} and minimum rating of ${minRating}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch Kitchen Items Ordered by Price
 * Create an endpoint /kitchen-items/ordered-by-price to return kitchen-items ordered by price in descending order..
 * API Call: http://localhost:3000/kitchen-items/ordered-by-price
 */
async function filterKitchenItemsOrderedByPrice() {
  let query = `SELECT * FROM kitchen_items  ORDER BY price DESC`;
  let response = await db.all(query, []);
  return { kitchenItems: response };
}
app.get("/kitchen-items/ordered-by-price", async (req, res) => {
  try {
    const results = await filterKitchenItemsOrderedByPrice();
    if (results.kitchenItems.length === 0) {
      return res.status(404).json({
        message: `No kitchenItems found`,
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
