const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Question 1: Sort Ages in Ascending Order
 * Data: [25, 30, 18, 22, 27]
 * API Call: http://localhost:3000/ages/sort-ascending
 * Expected Output: [18, 22, 25, 27, 30]
 */
let ages = [25, 30, 18, 22, 27];
function sortAgesAscending(age1, age2) {
  return age1 - age2;
}
app.get("/ages/sort-ascending", (req, res) => {
  let agesCopy = ages.slice();
  agesCopy.sort(sortAgesAscending);
  res.json(agesCopy);
});

/**
 * Question 2: Sort Ages in Descending Order
 * Data: [25, 30, 18, 22, 27]
 * API Call: http://localhost:3000/ages/sort-descending
 * Expected Output: [30, 27, 25, 22, 18]
 */
function sortAgesDescending(age1, age2) {
  return age2 - age1;
}
app.get("/ages/sort-descending", (req, res) => {
  let agesCopy = ages.slice();
  agesCopy.sort(sortAgesDescending);
  res.json(agesCopy);
});

/**
 * Question 3: Sort Students by Marks in Descending Order
 * API Call: http://localhost:3000/students/sort-by-marks-descending
 */
let students = [
  { name: "Rahul", rollNo: 101, marks: 85 },
  { name: "Sita", rollNo: 102, marks: 95 },
  { name: "Amit", rollNo: 103, marks: 70 },
];
function sortStudentsByMarksDescending(student1, student2) {
  return student2.marks - student1.marks;
}
app.get("/students/sort-by-marks-descending", (req, res) => {
  let studentsCopy = students.slice();
  studentsCopy.sort(sortStudentsByMarksDescending);
  res.json(studentsCopy);
});

/**
 * Question 4: Sort Cars by Mileage in Descending Order
 * API Call: http://localhost:3000/cars/sort-by-mileage-descending
 */
let cars = [
  { make: "Maruti", model: "Swift", mileage: 15 },
  { make: "Hyundai", model: "i20", mileage: 18 },
  { make: "Tata", model: "Nexon", mileage: 20 },
];
function sortCarsByMileageDescending(car1, car2) {
  return car2.mileage - car1.mileage;
}
app.get("/cars/sort-by-mileage-descending", (req, res) => {
  let carsCopy = cars.slice();
  carsCopy.sort(sortCarsByMileageDescending);
  res.json(carsCopy);
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
