const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Question 1: Write an Express code snippet to sort an array of heights in ascending order.
 * Given Data: [160, 175, 180, 165, 170]
 * API Call: <http://localhost:3000/heights/sort-ascending>
 * Expected Output: [160, 165, 170, 175, 180]
 */

const heights = [160, 175, 180, 165, 170];
function sortHeightsAscending(height1, height2) {
  return height1 - height2;
}
app.get("/heights/sort-ascending", (req, res) => {
  let hightsCopy = heights.slice();
  hightsCopy.sort(sortHeightsAscending);
  res.json(hightsCopy);
});

/**
 * Question 2: Write an Express code snippet to sort an array of heights in descending order.
 * Given Data: [160, 175, 180, 165, 170]
 * API Call: <http://localhost:3000/heights/sort-descending>
 * Expected Output: [180, 175, 170, 165, 160]
 */
function sortHeightsDescending(height1, height2) {
  return height2 - height1;
}
app.get("/heights/sort-descending", (req, res) => {
  let hightsCopy = heights.slice();
  hightsCopy.sort(sortHeightsDescending);
  res.json(hightsCopy);
});

/**
 * Question 3: Write an Express code snippet to sort an array of employees by salary in descending order.
 * API Call: <http://localhost:3000/employees/sort-by-salary-descending>
 */
let empolyees = [
  { name: "Rahul", employeeId: 101, salary: 50000 },
  { name: "Sita", employeeId: 102, salary: 60000 },
  { name: "Amit", employeeId: 103, salary: 45000 },
];
function sortEmployeesBySalaryDescending(employee1, employee2) {
  return employee2.salary - employee1.salary;
}
app.get("/employees/sort-by-salary-descending", (req, res) => {
  let empolyeesCopy = empolyees.slice();
  empolyeesCopy.sort(sortEmployeesBySalaryDescending);
  res.json(empolyeesCopy);
});

/**
 * Question 4: Write an Express code snippet to sort an array of books by pages in ascending order.
 * API Call: <http://localhost:3000/books/sort-by-pages-ascending>
 */
let books = [
  { title: "The God of Small Things", author: "Arundhati Roy", pages: 340 },
  { title: "The White Tiger", author: "Aravind Adiga", pages: 321 },
  { title: "The Palace of Illusions", author: "Chitra Banerjee", pages: 360 },
];
function sortBooksByPagesAscending(book1, book2) {
  return book1.pages - book2.pages;
}
app.get("/books/sort-by-pages-ascending", (req, res) => {
  let booksCopy = books.slice();
  booksCopy.sort(sortBooksByPagesAscending);
  res.json(booksCopy);
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
