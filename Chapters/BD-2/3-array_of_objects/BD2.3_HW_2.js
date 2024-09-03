const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Exercise 1: Filter In-Stock Products
 * Sample Endpoint: http://localhost:3000/in-stock-products
 */
let products = [
  { name: "Product A", inStock: true },
  { name: "Product B", inStock: false },
  { name: "Product C", inStock: true },
  { name: "Product D", inStock: false },
];
function filterInStockProducts(product) {
  return product.inStock;
}
app.get("/in-stock-products", (req, res) => {
  let result = products.filter((product) => filterInStockProducts(product));
  res.send(result);
});

/**
 * Exercise 2: Filter Adults from User List
 * Sample Endpoint: http://localhost:3000/adult-users
 */
let users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 17 },
  { name: "Dave", age: 16 },
];
function filterAdults(user) {
  return user.age >= 18;
}
app.get("/adult-users", (req, res) => {
  let result = users.filter((user) => filterAdults(user));
  res.send(result);
});

/**
 * Exercise 3: Filter Expensive Products
 * Sample Endpoint: http://localhost:3000/expensive-products?price=100
 */
let productsWithPrice = [
  { name: "Product A", price: 50 },
  { name: "Product B", price: 150 },
  { name: "Product C", price: 200 },
  { name: "Product D", price: 90 },
];
function filterExpensiveProducts(productObj, price) {
  return productObj.price > price;
}
app.get("/expensive-products", (req, res) => {
  let price = parseInt(req.query.price);
  let result = productsWithPrice.filter((product) =>
    filterExpensiveProducts(product, price),
  );
  res.send(result);
});

/**
 * Exercise 4: Filter Articles by Word Count
 * Sample Endpoint: http://localhost:3000/long-articles?minWords=500
 */
let articles = [
  { title: "Article A", wordCount: 400 },
  { title: "Article B", wordCount: 600 },
  { title: "Article C", wordCount: 700 },
  { title: "Article D", wordCount: 300 },
];
function filterLongArticles(article, minWords) {
  return article.wordCount > minWords;
}
app.get("/long-articles", (req, res) => {
  let minWords = parseInt(req.query.minWords);
  let result = articles.filter((article) =>
    filterLongArticles(article, minWords),
  );
  res.send(result);
});

/**
 * Exercise 5: Filter Movies by Rating
 * Sample Endpoint: http://localhost:3000/high-rated-movies?rating=8
 */
let movies = [
  { title: "Movie A", rating: 8.5 },
  { title: "Movie B", rating: 7.0 },
  { title: "Movie C", rating: 9.0 },
  { title: "Movie D", rating: 6.5 },
];
function filterHighRatedMovies(movie, rating) {
  return movie.rating > rating;
}
app.get("/high-rated-movies", (req, res) => {
  let rating = parseFloat(req.query.rating);
  let result = movies.filter((movie) => filterHighRatedMovies(movie, rating));
  res.send(result);
});

/**
 * Exercise 6: Filter Employees by Experience
 * Sample Endpoint: http://localhost:3000/experienced-employees?years=5
 */
let employees = [
  { name: "Employee A", experience: 3 },
  { name: "Employee B", experience: 6 },
  { name: "Employee C", experience: 10 },
  { name: "Employee D", experience: 2 },
];
function filterExperiencedEmployees(employee, years) {
  return employee.experience > years;
}
app.get("/experienced-employees", (req, res) => {
  let years = parseInt(req.query.years);
  let result = employees.filter((employee) =>
    filterExperiencedEmployees(employee, years),
  );
  res.send(result);
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
