const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Sample data
 */
let numbers = [1, 2, 3, 4, 5];
let strings = ["hello", "world", "javascript", "node"];

/**
 * Question 1: Add a Number to an Array of Numbers
 * Create an endpoint /numbers/add that adds a number to an array of numbers using array.push() and returns the updated array.
 * API Call: <http://localhost:3000/numbers/add>
 */
function addToArr(arr, num) {
  arr.push(num);
  return arr;
}
app.get("/numbers/add", (req, res) => {
  let result = addToArr(numbers, 6);
  res.json(result);
});

/**
 * Question 2: Add a String to an Array of Strings
 * Create an endpoint /strings/add that adds a string to an array of strings using array.push() and returns the updated array.
 * API Call: <http://localhost:3000/strings/add
 */
app.get("/strings/add", (req, res) => {
  let result = addToArr(strings, "express");
  res.json(result);
});

/**
 * Question 3 : Sum an Array of Numbers Using for Loop
 * Create an endpoint /numbers/sum that sums an array of numbers using a for loop and returns the sum.
 * API Call: <http://localhost:3000/numbers/sum>
 */
function sumNumbers(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
app.get("/numbers/sum", (req, res) => {
  let result = sumNumbers(numbers);
  res.json({ sum: result });
});

/**
 * Question 4 : Find the Maximum Number in an Array
 * Create an endpoint /numbers/max that finds the maximum number in an array using a for loop and returns the maximum number.
 * API Call: <http://localhost:3000/numbers/max>
 */
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
app.get("/numbers/max", (req, res) => {
  let result = findMax(numbers);
  res.json({ max: result });
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
