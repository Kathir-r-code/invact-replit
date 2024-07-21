const express = require("express");
const app = express();
const PORT = 3000;

// Question 1: Calculate a person’s BMI category given weight (kilograms) and height(meters)
/**
 * API Call: http://localhost:3000/check-bmi?weight=70&height=1.75
 * Expected Output: BMI category is normal weight
 */
app.get("/check-bmi", (req, res) => {
  const weight = parseFloat(req.query.weight);
  const height = parseFloat(req.query.height);
  const bmi = weight / (height * height);
  let result = "";
  if (bmi < 18.5) {
    result = "underweight";
  } else if (bmi < 24.9) {
    result = "normal weight";
  } else if (bmi < 29.9) {
    result = "overweight";
  } else {
    result = "obese";
  }
  res.send(`BMI category is ${result}`);
});

// Question 2: Calculate a student’s academic performance based on their grade
/**
 * API Call: http://localhost:3000/check-performance?grade=91
 * Expected Output: Academic performance is excellent
 */
app.get("/check-performance", (req, res) => {
  const grade = parseFloat(req.query.grade);
  let result = "";
  if (grade >= 90) {
    result = "excellent";
  } else if (grade >= 75) {
    result = "good";
  } else if (grade >= 50) {
    result = "average";
  } else {
    result = "poor";
  }
  res.send(`Academic performance is ${result}`);
});

// Question 3: Calculate a person’s age group given their age
/**
 * API Call: <http://localhost:3000/check-age-group?age=25>
 * Expected Output: Age group is adult
 */
app.get("/check-age-group", (req, res) => {
  const age = parseInt(req.query.age);
  let result = "";
  if (age <= 12) {
    result = "child";
  } else if (age <= 17) {
    result = "teenager";
  } else if (age <= 64) {
    result = "adult";
  } else {
    result = "senior";
  }
  res.send(`Age group is ${result}`);
});

// Question 4: Calculate a person’s loan eligibility given creditScore
/**
 * API Call: http://localhost:3000/check-loan-eligibility?creditScore=670
 * Expected Output: Loan eligibility is medium
 */
app.get("/check-loan-eligibility", (req, res) => {
  const creditScore = parseInt(req.query.creditScore);
  let result = "";
  if (creditScore >= 750) {
    result = "high";
  } else if (creditScore >= 650) {
    result = "medium";
  } else {
    result = "low";
  }
  res.send(`Loan eligibility is ${result}`);
});

// Question 5:Given a person’s income calculate the tax bracket they fall in
/**
 * API Call: <http://localhost:3000/check-tax-bracket?income=720000>
 * Expected Output: You fall under the 15% tax bracket
 */
app.get("/check-tax-bracket", (req, res) => {
  const income = parseFloat(req.query.income);
  let result = "";
  if (income <= 500000) {
    result = "10%";
  } else if (income <= 1000000) {
    result = "15%";
  } else if (income <= 1500000) {
    result = "20%";
  } else {
    result = "30%";
  }
  res.send(`You fall under the ${result} tax bracket`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
