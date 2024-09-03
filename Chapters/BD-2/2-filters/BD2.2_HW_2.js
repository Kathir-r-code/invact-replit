const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Exercise 1: Filter Prime Numbers
 * Given Data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
 * Sample Endpoint: http://localhost:3000/prime-numbers
 * Expected Output: [2, 3, 5, 7, 11]
 */
function filterPrimeNumbers(num) {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false; // If num is divisible by any number other than 1 and itself
    }
  }
  return true;
}
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
app.get("/prime-numbers", (req, res) => {
  let result = numbers.filter((num) => filterPrimeNumbers(num));
  res.json(result);
});

/**
 * Exercise 2: Filter Positive Numbers
 * Given Data: [-10, -5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
 * Sample Endpoint: http://localhost:3000/positive-numbers
 * Expected Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 */
function filterPositiveNumbers(num) {
  return num > 0;
}
const numbersList = [-10, -5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
app.get("/positive-numbers", (req, res) => {
  let result = numbersList.filter((num) => filterPositiveNumbers(num));
  res.json(result);
});

/**
 * Exercise 3: Filter Negative Numbers
 * Given Data: [-10, -5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
 * Sample Endpoint: http://localhost:3000/negative-numbers
 * Expected Output: [-10, -5]
 */
function filterNegativeNumbers(num) {
  return num < 0;
}
app.get("/negative-numbers", (req, res) => {
  let result = numbersList.filter((num) => filterNegativeNumbers(num));
  res.json(result);
});

/**
 * Exercise 4: Filter Odd Numbers
 * Given Data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
 * Sample Endpoint: http://localhost:3000/odd-numbers
 * Expected Output: [1, 3, 5, 7, 9]
 */
function filterOddNumbers(num) {
  return num % 2 !== 0;
}
let numbersList2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
app.get("/odd-numbers", (req, res) => {
  let result = numbersList2.filter((num) => filterOddNumbers(num));
  res.json(result);
});

/**
 * Exercise 5: Filter Numbers Greater Than a Given Value
 * Given Data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
 * Sample Endpoint: http://localhost:3000/numbers-greater-than?value=5
 * Expected Output: [6, 7, 8, 9, 10]
 */
function filterNumbersGreaterThan(num, maxValue) {
  return num > maxValue;
}
app.get("/numbers-greater-than", (req, res) => {
  let maxValue = parseInt(req.query.value);
  let result = numbersList2.filter((num) =>
    filterNumbersGreaterThan(num, maxValue),
  );
  res.json(result);
});

/**
 * Exercise 6: Filter Numbers Less Than a Given Value
 * Given Data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
 * Sample Endpoint: http://localhost:3000/numbers-less-than?value=5
 * Expected Output: [1, 2, 3, 4]
 */
function filterNumbersLessThan(num, givenValue) {
  return num < givenValue;
}
app.get("/numbers-less-than", (req, res) => {
  let givenValue = parseInt(req.query.value);
  let result = numbersList2.filter((num) =>
    filterNumbersLessThan(num, givenValue),
  );
  res.json(result);
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
