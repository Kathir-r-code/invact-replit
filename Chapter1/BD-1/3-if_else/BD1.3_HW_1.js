const express = require("express");
const { get } = require("http");
const app = express();
const PORT = 3000;

// Question 1: Create an endpoint that takes a number as a query parameter and returns whether the number is a whole number or not.
/**
 * API Call: <http://localhost:3000/check-whole-number?number=10>
 * Expected Output: Number is whole number
 */
app.get("/check-whole-number", (req, res) => {
  const number = parseFloat(req.query.number);
  let result = "";
  if (number >= 0) {
    result = "whole";
  } else {
    result = "not whole";
  }
  res.send(`Number is ${result} number`);
});

// Question 2: Create an endpoint that takes two numbers as a query parameter and returns whether the numbers are equal or not.
/**
 * API Call: <http://localhost:3000/check-equal?num1=40&num2=45>
 * Expected Output: Numbers are not equal
 */
app.get("/check-equal", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  let result = "";
  if (num1 === num2) {
    result = "equal";
  } else {
    result = "not equal";
  }
  res.send(`Numbers are ${result}`);
});

// Question 3: Create an endpoint that takes a boolean query parameter indicating if a user is active and returns 'User is Active' or 'User is not Active'.
/**
 * API Call: <http://localhost:3000/check-active?isActive=true>
 * Expected Output: User is Active
 */
app.get("/check-active", (req, res) => {
  const isActive = req.query.isActive;
  let result = "";
  if (isActive === "true") {
    result = "Active";
  } else {
    result = "not Active";
  }
  res.send(`User is ${result}`);
});

// Question 4: Create an endpoint that takes a user's cost of goods bought as a query parameter and returns 'User is eligible for a discount' if the cost is over 1000, otherwise 'User is not eligible for a discount'.
/**
 * API Call: <http://localhost:3000/check-discount?cost=1700>
 * Expected Output: User is eligible for a discount
 */
app.get("/check-discount", (req, res) => {
  const cost = parseFloat(req.query.cost);
  let result = "";
  if (cost > 1000) {
    result = "eligible";
  } else {
    result = "not eligible";
  }
  res.send(`User is ${result} for a discount`);
});

// Question 5: Create an endpoint that takes work experience (in years) as a query parameter and returns whether the person is experienced, fresher, or non-working.
/**
 * API Call: <http://localhost:3000/check-experience?workExperience=5>
 * Expected Output: Person is experienced
 */
app.get("/check-experience", (req, res) => {
  const workExperience = parseFloat(req.query.workExperience);
  let result = "";
  if (workExperience > 0) {
    result = "experienced";
  } else if (workExperience < 0) {
    result = "non-working";
  } else {
    result = "fresher";
  }
  res.send(`Person is ${result}`);
});

// Question 6: Create an endpoint that takes the result as a query parameter and returns whether the grade is Grade A (above 80), B (between 50 to 80), or Fail (below 50).
/**
 * API Call: <http://localhost:3000/check-result?result=70>
 * Expected Output: The grade is B
 */
app.get("/check-result", (req, res) => {
  const result = parseFloat(req.query.result);
  let grade = "";
  if (result > 80) {
    grade = "A";
  } else if (result >= 50) {
    grade = " B";
  } else {
    grade = "Fail";
  }
  res.send(`The grade is ${grade}`);
});

// Question 7: Create an endpoint that takes the number of steps as a query parameter and returns whether the student’s attendance is low (less than 50 classes), moderate (50 to 90 classes), or high (more than 90 classes).
/**
 * API Call: <http://localhost:3000/check-attendance?attendance=95>
 * Expected Output: Attendance is high
 */
app.get("/check-attendance", (req, res) => {
  const attendance = parseInt(req.query.attendance);
  let result = "";
  if (attendance < 50) {
    result = "low";
  } else if (attendance <= 90) {
    result = "moderate";
  } else {
    result = "high";
  }
  res.send(`Attendance is ${result}`);
});

// Question 8: Create an endpoint that takes the number of stars a restaurant has as a query parameter and returns whether the restaurant rating is low (less than 3 stars), medium (3 or 4 stars), or high (5 stars).
/**
 * API Call: <http://localhost:3000/check-rating?stars=4>
 * Expected Output: Restaurant rating is medium
 */
app.get("/check-rating", (req, res) => {
  const stars = parseInt(req.query.stars);
  let result = "";
  if (stars < 3) {
    result = "low";
  } else if (stars <= 4) {
    result = "medium";
  } else {
    result = "high";
  }
  res.send(`Restaurant rating is ${result}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
