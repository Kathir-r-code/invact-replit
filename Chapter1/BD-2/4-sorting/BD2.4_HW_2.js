const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Exercise 1: Sort Books by Year in ascending order
 * Sample Endpoint: http://localhost:3000/books/sort-by-year
 */
let books = [
  { title: "Moby Jonas", author: "Herman Melville", publication_year: 2023 },
  { title: "1984", author: "George Orwell", publication_year: 1984 },
  {
    title: "A Tale of Two Cities",
    author: "Charles Jonas",
    publication_year: 2000,
  },
];
function sortBooksByYear(book1, book2) {
  return book1.publication_year - book2.publication_year;
}
app.get("/books/sort-by-year", (req, res) => {
  let _tempBooks = books.slice();
  _tempBooks.sort(sortBooksByYear);
  res.json(_tempBooks);
});

/**
 * Exercise 2: Sort Employees by Salary in Descending Order
 * Sample Endpoint: http://localhost:3000/employees/sort-by-salary
 */
let employees = [
  { name: "John", salary: 75000 },
  { name: "Doe", salary: 30000 },
  { name: "Jane", salary: 50000 },
];
function sortEmployeesBySalary(employee1, employee2) {
  return employee2.salary - employee1.salary;
}
app.get("/employees/sort-by-salary", (req, res) => {
  let _tempEmployees = employees.slice();
  _tempEmployees.sort(sortEmployeesBySalary);
  res.json(_tempEmployees);
});

/**
 * Exercise 3: Sort Products by Price in Ascending Order
 * Sample Endpoint: http://localhost:3000/products/sort-by-price
 */
let products = [
  { name: "Product A", price: 15 },
  { name: "Product B", price: 25 },
  { name: "Product C", price: 10 },
];
function sortProductsByPrice(product1, product2) {
  return product1.price - product2.price;
}
app.get("/products/sort-by-price", (req, res) => {
  let _tempProducts = products.slice();
  _tempProducts.sort(sortProductsByPrice);
  res.json(_tempProducts);
});

/**
 * Exercise 4: Sort Movies by Rating in Descending Order
 * Sample Endpoint: http://localhost:3000/movies/sort-by-rating
 */
let movies = [
  { title: "Movie A", rating: 9.0 },
  { title: "Movie C", rating: 7.0 },
  { title: "Movie B", rating: 8.5 },
];
function sortMoviesByRating(movie1, movie2) {
  return movie2.rating - movie1.rating;
}
app.get("/movies/sort-by-rating", (req, res) => {
  let _tempMovies = movies.slice();
  _tempMovies.sort(sortMoviesByRating);
  res.json(_tempMovies);
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
