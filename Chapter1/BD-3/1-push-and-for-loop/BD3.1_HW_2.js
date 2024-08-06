const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Sample data
 */
let cartItems = [
  { item: "Book", price: 30 },
  { item: "Pen", price: 5 },
  { item: "Notebook", price: 50 },
  { item: "Bag", price: 125 },
];

let students = [
  { name: "John", grade: "A" },
  { name: "Jane", grade: "A" },
  { name: "Jack", grade: "B" },
  { name: "Jill", grade: "C" },
];

let temperatures = [0, 20, 30, 100];

let student_scores = [
  { name: "John", score: 85 },
  { name: "Jane", score: 90 },
  { name: "Jack", score: 70 },
  { name: "Jill", score: 60 },
];

let sentence = "The quick brown fox jumps over the lazy dog";

/**
 * Exercise 1: Calculate Total Price of Items in a Cart
 * Create an endpoint /cart/total that calculates the total price of items in the cart.
 * API Call: <http://localhost:3000/cart/total>
 * Expected op: {'totalPrice': 210}
 */
function calculateTotalPrice(cartItems) {
  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].price;
  }
  return totalPrice;
}
app.get("/cart/total", (req, res) => {
  let totalPrice = calculateTotalPrice(cartItems);
  res.json({ totalPrice: totalPrice });
});

/**
 * Exercise 2: Filter Students by Grade
 * Create an endpoint /students/filter that accepts a grade from request query.
 * API Call: <http://localhost:3000/students/filter?grade=A>
 * Expected Output: {
 * 'students': [
    { 'name': 'John', 'grade': 'A' },
    { 'name': 'Jane', 'grade': 'A' }
  ]}
 */
function filterStudentsByGrade(students, grade) {
  let filteredStudents = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].grade === grade) {
      filteredStudents.push(students[i]);
    }
  }
  return filteredStudents;
}
app.get("/students/filter", (req, res) => {
  let grade = req.query.grade;
  let filteredStudents = filterStudentsByGrade(students, grade);
  res.json({ students: filteredStudents });
});

/**
 * Exercise 3: Convert Temperatures from Celsius to Fahrenheit
 * Create an endpoint /temperatures/convert that accepts an array of temperatures from the request parameters.
 * API call: <http://localhost:3000/temperatures/convert>
 * Expected Output: {convertedTemperatures: [32, 68, 86, 212]}
 */
function convertCelsiusToFahrenheit(tempArray) {
  let convertedTemperatures = [];
  for (let i = 0; i < tempArray.length; i++) {
    convertedTemperatures.push((tempArray[i] * 9) / 5 + 32);
  }
  return convertedTemperatures;
}
app.get("/temperatures/convert", (req, res) => {
  let convertedTemperatures = convertCelsiusToFahrenheit(temperatures);
  res.json({ convertedTemperatures: convertedTemperatures });
});

/**
 * Exercise 4: Calculate Average Score of Students
 * Create an endpoint /students/average-score that accepts an array of student_scores & calculates the average score of students.
 * API Call: <http://localhost:3000/students/average-score>
 * Expected Output: {averageScore: 76.25}
 */
function calculateAverageScore(student_scores) {
  let totalScore = 0;
  for (let i = 0; i < student_scores.length; i++) {
    totalScore += student_scores[i].score;
  }
  let averageScore = totalScore / student_scores.length;
  return averageScore;
}
app.get("/students/average-score", (req, res) => {
  let averageScore = calculateAverageScore(student_scores);
  res.json({ averageScore: averageScore });
});

/**
 * Exercise 5: Count Words in a Sentence
 * Create an endpoint /sentence/count-words that accepts a sentence from the request parameters.
 * API Call: <http://localhost:3000/sentence/count-words>
 * Expected Output: {wordCount: 9}
 */
function countWords(sentence) {
  let wordCount = sentence.split(" ").length;
  return wordCount;
}
app.get("/sentence/count-words", (req, res) => {
  let wordCount = countWords(sentence);
  res.json({ wordCount: wordCount });
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
