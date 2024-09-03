const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename:
      "./Chapters/BD-4/3-filter-by-parameter/BD4.3_HW_3/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3 HW3 Template" });
});

/**
 * Exercise 1: Fetch All Products by category
 * Create an endpoint /products/category/:category to fetch products by a specific category.
 * API Call: http://localhost:3000/products/category/Electronics
 */
async function fetchProductsByCategory(category) {
  let query = `SELECT * FROM products WHERE category = ?`;
  let response = await db.all(query, [category]);
  return { products: response };
}
app.get("/products/category/:category", async (req, res) => {
  let category = req.params.category;
  try {
    const results = await fetchProductsByCategory(category);
    if (results.products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch Products by Brands
 * Create an endpoint /products/brand/:brand return all the products by specific brand .
 * API Call: http://localhost:3000/products/brand/BrandA
 */
async function fetchProductsByBrand(brand) {
  let query = `SELECT * FROM products WHERE brand = ?`;
  let response = await db.all(query, [brand]);
  return { products: response };
}
app.get("/products/brand/:brand", async (req, res) => {
  let brand = req.params.brand;
  try {
    const results = await fetchProductsByBrand(brand);
    if (results.products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch Products by Rating
 * Create an endpoint /products/rating/:rating to return all the products more than equal to the rating.
 * API Call: http://localhost:3000/products/rating/4.5
 */
async function fetchProductsByRating(rating) {
  let query = `SELECT * FROM products WHERE rating >= ?`;
  let response = await db.all(query, [rating]);
  return { products: response };
}
app.get("/products/rating/:rating", async (req, res) => {
  let rating = req.params.rating;
  try {
    const results = await fetchProductsByRating(rating);
    if (results.products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4 : Fetch products by stock Count
 * Create an endpoint /products/stocks/:stock to return all the products.
 * API Call: http://localhost:3000/products/stocks/200
 */
async function fetchProductsByStocks(stock) {
  let query = `SELECT * FROM products WHERE stock <= ?`;
  let response = await db.all(query, [stock]);
  return { products: response };
}
app.get("/products/stocks/:stock", async (req, res) => {
  let stock = req.params.stock;
  try {
    const results = await fetchProductsByStocks(stock);
    if (results.products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
