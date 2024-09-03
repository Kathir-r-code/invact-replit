const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Sample Data
 */
let numbers = [1, 2, 3, 4, 5];
let strings = ["hello", "world", "javascript", "node"];

/**
 * Exercise 1: Multiply All Numbers in an Array
 * Create an endpoint /numbers/multiply that accepts a number from the request parameters.
 * API Call: <http://localhost:3000/numbers/multiply?multiplier=2>
 * Expected o/p : {'result': [2, 4, 6, 8, 10]}
 */
function multiplyNumber(numbers, multiplier) {
  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    result.push(numbers[i] * multiplier);
  }
  return result;
}
app.get("/numbers/multiply", (req, res) => {
  let multiplier = parseInt(req.query.multiplier);
  let result = multiplyNumber(numbers, multiplier);
  res.json({ result: result });
});

/**
 * Exercise 2: Concatenate Strings
 * Create an endpoint /strings/concat that accepts a string from the request parameters.
 * API Call: <http://localhost:3000/strings/concat?suffix=!
 * Expected o/p: {'result': ['hello!', 'world!', 'javascript!', 'node!']}
 */
function concatStrings(strings, suffix) {
  let result = [];
  for (let i = 0; i < strings.length; i++) {
    result.push(strings[i] + suffix);
  }
  return result;
}
app.get("/strings/concat", (req, res) => {
  let suffix = req.query.suffix;
  let result = concatStrings(strings, suffix);
  res.json({ result: result });
});

/**
 * Exercise 3: Remove All Odd Numbers from an Array
 * Create an endpoint /numbers/remove-odds that removes all odd numbers from the array
 * API Call: <http://localhost:3000/numbers/remove-odds>
 * Expected o/p: {'result': [2, 4]}
 */
function removeOddNumbers(numbers) {
  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      result.push(numbers[i]);
    }
  }
  return result;
}
app.get("/numbers/remove-odds", (req, res) => {
  let result = removeOddNumbers(numbers);
  res.json({ result: result });
});

/**
 * Exercise 4: Join All Strings in an Array
 * Create an endpoint /strings/join that join all strings in the array.
 * API Call: <http://localhost:3000/strings/join>
 * Expected o/p: {'result': 'hello world javascript node'}
 */
function joinStrings(strings) {
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += ` ${strings[i]}`;
  }
  return result;
}
app.get("/strings/join", (req, res) => {
  let result = joinStrings(strings);
  res.json({ result: result });
});

/**
 * Exercise 5: Double All Numbers in an Array
 * Create an endpoint /numbers/double that doubles all numbers in the array.
 * API Call: <http://localhost:3000/numbers/double>
 * Expected o/p: {result: [2, 4, 6, 8, 10]}
 */
function doubleNumbers(numbers) {
  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    result.push(numbers[i] * 2);
  }
  return result;
}
app.get("/numbers/double", (req, res) => {
  let result = doubleNumbers(numbers);
  res.json({ result: result });
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
