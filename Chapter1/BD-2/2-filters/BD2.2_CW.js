const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Question 1: Return Only the Even Numbers
 * Given Data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * API Call: http://localhost:3000/even-numbers
 * Expected Output: [2, 4, 6, 8, 10]
 */

function filterEvenNumbers(num) {
  return num % 2 === 0;
}
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
app.get("/even-numbers", (req, res) => {
  let result = numbers.filter((num) => filterEvenNumbers(num));
  res.json(result);
});

/**
 * Question 2: Return Only the Ages Greater Than 18
 * Given Data: [10, 20, 30, 15, 17, 25]
 * API Call: http://localhost:3000/adult-ages
 * Expected Output: [ 20, 30, 25 ]
 */
function filterAgeGreaterThan18(age) {
  return age > 18;
}
const ages = [10, 20, 30, 15, 17, 25];
app.get("/adult-ages", (req, res) => {
  let result = ages.filter((age) => filterAgeGreaterThan18(age));
  res.json(result);
});

/**
 * Question 3: Return Only the Words Longer Than 5 Characters
 * Given Data: ['apple', 'banana', 'cherry', 'date', 'fig', 'grape']
 * API Call: http://localhost:3000/long-words
 * Expected Output: ['banana', 'cherry']
 */
function filterLongWords(word) {
  return word.length > 5;
}
const words = ["apple", "banana", "cherry", "date", "fig", "grape"];
app.get("/long-words", (req, res) => {
  const result = words.filter((word) => filterLongWords(word));
  res.json(result);
});

/**
 * Question 4: Return Only the Files Smaller Than a Certain Size
 * Given Data: [50, 200, 75, 120, 30, 90, 150]
 * API Call: http://localhost:3000/small-files?filterParam=100
 * Expected Output: [50, 75, 30, 90]
 */
function filterSmallFiles(fileSize, filterParam) {
  return fileSize < filterParam;
}
const files = [50, 200, 75, 120, 30, 90, 150];
app.get("/small-files", (req, res) => {
  const filterParam = parseInt(req.query.filterParam);
  const result = files.filter((fileSize) =>
    filterSmallFiles(fileSize, filterParam),
  );
  res.json(result);
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
