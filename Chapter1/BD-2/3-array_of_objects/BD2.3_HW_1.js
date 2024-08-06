const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Question 1: Write an Express code snippet to filter employees by department.
 * API Call: <http://localhost:3000/employees/department/HR>
 */
let employees = [
  { name: "Rahul Gupta", department: "HR", salary: 50000 },
  { name: "Sneha Sharma", department: "Finance", salary: 60000 },
  { name: "Priya Singh", department: "Marketing", salary: 55000 },
  { name: "Amit Kumar", department: "IT", salary: 65000 },
];
function filterByDepartment(employeeObj, department) {
  return employeeObj.department === department;
}
app.get("/employees/department/:department", (req, res) => {
  let department = req.params.department;
  let result = employees.filter((employeeObj) =>
    filterByDepartment(employeeObj, department),
  );
  res.json(result);
});

/**
 * Question 2: Write an Express code snippet to filter bikes by mileage greater than a specified value.
 * API Call: <http://localhost:3000/bikes/mileage/70>
 */
let bikes = [
  { make: "Hero", model: "Splendor", mileage: 80 },
  { make: "Bajaj", model: "Pulsar", mileage: 60 },
  { make: "TVS", model: "Apache", mileage: 70 },
];
function filterByMileage(bikeObj, mileage) {
  return bikeObj.mileage > mileage;
}
app.get("/bikes/mileage/:mileage", (req, res) => {
  let mileage = parseInt(req.params.mileage);
  let result = bikes.filter((bikeObj) => filterByMileage(bikeObj, mileage));
  res.json(result);
});

/**
 * Question 3: Write an Express code snippet to filter bikes by a specific make.
 * API Call: <http://localhost:3000/bikes/make/Hero>
 */
function filterByMake(bikeObj, make) {
  return bikeObj.make === make;
}
app.get("/bikes/make/:make", (req, res) => {
  let make = req.params.make;
  let result = bikes.filter((bikeObj) => filterByMake(bikeObj, make));
  res.json(result);
});

/**
 * Question 4: Write an Express code snippet to filter songs by rating higher than a specified value.
 * API Call: <http://localhost:3000/songs/rating/4>
 */
let songs = [
  { title: "Tum Hi Ho", genre: "Romantic", rating: 4 },
  { title: "Senorita", genre: "Pop", rating: 5 },
  { title: "Dil Chahta Hai", genre: "Bollywood", rating: 3 },
];
function filterByRating(songObj, rating) {
  return songObj.rating > rating;
}
app.get("/songs/rating/:rating", (req, res) => {
  let rating = parseInt(req.params.rating);
  let result = songs.filter((songObj) => filterByRating(songObj, rating));
  res.json(result);
});

/**
 * Question 5: Write an Express code snippet to filter songs by a specific genre.
 * API Call: <http://localhost:3000/songs/genre/Romantic>
 */
function filterByGenre(songObj, genre) {
  return songObj.genre === genre;
}
app.get("/songs/genre/:genre", (req, res) => {
  let genre = req.params.genre;
  let result = songs.filter((songObj) => filterByGenre(songObj, genre));
  res.json(result);
});

/**
 * Question 6: Write an Express code snippet to filter tasks by a specific status.
 * API Call: <http://localhost:3000/tasks/status/completed>
 */
let tasks = [
  { taskId: 1, taskName: "Prepare Presentation", status: "pending" },
  { taskId: 2, taskName: "Attend Meeting", status: "in-progress" },
  { taskId: 3, taskName: "Submit Report", status: "completed" },
];
function filterByStatus(taskObj, status) {
  return taskObj.status === status;
}
app.get("/tasks/status/:status", (req, res) => {
  let status = req.params.status;
  let result = tasks.filter((taskObj) => filterByStatus(taskObj, status));
  res.json(result);
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
