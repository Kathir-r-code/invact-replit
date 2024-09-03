const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename:
      "./Chapters/BD-4/1-SQL-queries-and-async-await/BD4.1_HW_3/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 HW3 Template" });
});

// YOUR ENDPOINTS GO HERE
/**
 * Exercise 1: Fetch All Products
 * Create an endpoint /products to return all the products.
 * API call : http://localhost:3000/products
 */
async function fetchAllProducts() {
  let query = "SELECT * FROM products";
  let response = await db.all(query, []);
  return { products: response };
}
app.get("/products", async (req, res) => {
  let result = await fetchAllProducts();
  res.status(200).json(result);
});

/**
 * Exercise 2: Retrieve Products by Brand
 * Define the endpoint /products/brand/:brand to retrieve products by a specific brand.
 * API call : http://localhost:3000/products/brand/Sony
 */
async function fetchProductsByBrand(brand) {
  let query = `SELECT * FROM products WHERE brand = ?`;
  let response = await db.all(query, [brand]);
  return { products: response };
}
app.get("/products/brand/:brand", async (req, res) => {
  let brand = req.params.brand;
  let result = await fetchProductsByBrand(brand);
  res.status(200).json(result);
});

/**
 * Exercise 3: Retrieve Products by Category
 * Define the endpoint /products/category/:category to retrieve products by a specific category.
 * API call: http://localhost:3000/products/category/Electronics
 */
async function fetchProductsByCategory(category) {
  let query = `SELECT * FROM products WHERE category = ?`;
  let response = await db.all(query, [category]);
  return { products: response };
}
app.get("/products/category/:category", async (req, res) => {
  let category = req.params.category;
  let result = await fetchProductsByCategory(category);
  res.status(200).json(result);
});

/**
 * Exercise 4: Retrieve Products by stocks
 * Define the endpoint /products/stock/:stocks to retrieve products by release year.
 * API call: http://localhost:3000/products/stock/in-stock
 */
async function fetchProductsByStock(stock) {
  let query = `SELECT * FROM products WHERE stock = ?`;
  let response = await db.all(query, [stock]);
  return { products: response };
}
app.get("/products/stock/:stock", async (req, res) => {
  let stock = req.params.stock;
  let result = await fetchProductsByStock(stock);
  res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
