const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Question 1: Given username generate a GitHub profile URL for the user
 * API Call: http://localhost:3000/github-profile?username=ankitkumar123
 * Expected Output: https://github.com/ankitkumar123
 */
function generateProfileUrl(username) {
  return `https://github.com/${username}`;
}
app.get("/github-profile", (req, res) => {
  const username = req.query.username;
  res.send(generateProfileUrl(username));
});

/**
 * Question 2: Generate certification
 * API Call: http://localhost:3000/certificate?firstName=Amit&lastName=Ranjan&courseName=BytR
 * Expected Output: This certification is awarded to Amit Ranjan for completing the course BYTR
 */
function generateCertificate(firstName, lastName, courseName) {
  return `This certification is awarded to ${firstName} ${lastName} for completing the course ${courseName}`;
}
app.get("/certificate", (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const courseName = req.query.courseName;
  res.send(generateCertificate(firstName, lastName, courseName));
});

/**
 * Question 3: Create an endpoint that takes maths, science & english as query parameters and returns grade in percentage
 * API Call: <http://localhost:3000/grade?maths=70&science=82&english=75>
 * Expected Output: Your grade in percentage is 76%
 */
function calculateGrade(maths, science, english) {
  return Math.round(((maths + science + english) / 300) * 100);
}
app.get("/grade", (req, res) => {
  const maths = parseInt(req.query.maths);
  const science = parseInt(req.query.science);
  const english = parseInt(req.query.english);
  res.send(
    `Your grade in percentage is ${calculateGrade(maths, science, english)}%`,
  );
});

/**
 * Question 4: Create an endpoint that takes billAmount & numberOfFriends as query parameters and returns the result
 * API Call: http://localhost:3000/split-bill?billAmount=150&numberOfFriends=3
 * Expected Output: Result: Each friend owes Rs. 50 against the bill
 */
function splitBill(billAmount, numberOfFriends) {
  return Math.round(billAmount / numberOfFriends);
}
app.get("/split-bill", (req, res) => {
  const billAmount = parseFloat(req.query.billAmount);
  const numberOfFriends = parseInt(req.query.numberOfFriends);
  res.send(
    `Result: Each friend owes Rs. ${splitBill(billAmount, numberOfFriends)} against the bill`,
  );
});

/**
 * Question 5: Create an endpoint that takes a totalHours & hourlyWage and returns the monthly salary.
 * API Call:http://localhost:3000/monthly-salary?hourlyWage=2000&totalHours=160
 * Expected Output: Result: Your monthly salary is ₹320000
 */
function calculateSalary(hourlyWage, totalHours) {
  return totalHours * hourlyWage;
}
app.get("/monthly-salary", (req, res) => {
  const totalHours = parseFloat(req.query.totalHours);
  const hourlyWage = parseFloat(req.query.hourlyWage);
  res.send(
    `Result: Your monthly salary is ₹${calculateSalary(hourlyWage, totalHours)}`,
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
