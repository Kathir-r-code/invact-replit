const express = require("express");
const app = express();
const PORT = 3000;

//Question 1: Create an endpoint that takes a number as a query parameter and returns if the number is positive or negative.
app.get("/check-number", (req, res) => {
  const number = parseFloat(req.query.number);
  let result = "";
  if (number >= 0) {
    result = "positive";
  } else {
    result = "negative";
  }
  res.send(`Number is ${result}`);
});

// Question 2: Create an endpoint that takes a number as a query parameter and returns if the number is even or odd.
app.get("/check-even-odd", (req, res) => {
  const number = parseInt(req.query.number);
  let result = "";
  if (number % 2 === 0) {
    result = "even";
  } else {
    result = "odd";
  }
  res.send(`Number is ${result}`);
});

// Question 3: Create an endpoint that takes a boolean query parameter isLoggedIn and returns if the user is logged in.
app.get("/check-login", (req, res) => {
  const isLoggedIn = req.query.isLoggedIn;
  res.send(`User is ${isLoggedIn === "true" ? "logged in" : "not logged in"}`);
});

// Question 4: Create an endpoint that takes an age as a query parameter and returns if the user is eligible for a discount (age over 65).
app.get("/check-discount", (req, res) => {
  const age = parseInt(req.query.age);
  let result = "";
  if (age > 65) {
    result = "User is eligible for a discount";
  } else {
    result = "User is not eligible for a discount";
  }
  res.send(result);
});

// Question 5: Create an endpoint that takes a number as a query parameter and returns if the number is positive, negative, or zero.
app.get("/check-number-type", (req, res) => {
  const number = parseFloat(req.query.number);
  let result = "";
  if (number === 0) {
    result = "Number is zero";
  } else if (number > 0) {
    result = "Number is positive";
  } else {
    result = "Number is negative";
  }
  res.send(result);
});

// Question 6: Create an endpoint that takes a temperature as a query parameter and returns if the temperature is cold (below 15°C), warm (15°C to 25°C), or hot (above 25°C).
app.get("/check-temperature", (req, res) => {
  const temperature = parseFloat(req.query.temperature);
  let result = "";
  if (temperature < 15) {
    result = "cold";
  } else if (temperature <= 25) {
    result = "warm";
  } else {
    result = "hot";
  }
  res.send(`Temperature is ${result}`);
});

// Question 7: Create an endpoint that takes a steps as a query parameter and returns if the user's activity level is low (below 5000), moderate (5000 to 10000), or high (above 10000).
app.get("/check-activity-level", (req, res) => {
  const steps = parseInt(req.query.steps);
  let result = "";
  if (steps < 5000) {
    result = "low";
  } else if (steps <= 10000) {
    result = "moderate";
  } else {
    result = "high";
  }
  res.send(`Activity level is ${result}`);
});

// Question 8: Create an endpoint that takes likes as a query parameter and returns if a social media post has low (below 100), medium (100 to 500), or high engagement (above 500).
app.get('/check-engagement', (req, res) => {
  const likes = parseInt(req.query.likes);
  let result = "";
  if (likes < 100) {
    result = "low";
  } else if (likes <= 500) {
    result = "medium";
  } else {
    result = "high";
  }
  res.send(`Engagement is ${result}`);
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
