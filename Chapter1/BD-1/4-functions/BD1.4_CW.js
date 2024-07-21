const express = require("express");
const { addAbortSignal } = require("stream");
const app = express();
const PORT = 3000;

// Functions
function getWelcomeMessage() {
  return "Welcome to our service!";
}

function getGreetingMessage(userName) {
  return `Hello, ${userName}!`;
}

function checkPassword(password) {
  if (password.length > 15) {
    return "Password is strong";
  } else {
    return "Password is weak";
  }
}

function calculateSum(num1, num2) {
  return num1 + num2;
}

function getSubscriptionStatus(username, isSubscribed) {
  const message =
    isSubscribed === "true"
      ? `${username} is subscribed`
      : `${username} is not subscribed`;
  return message;
}

function getDiscountPrice(price, discountPercentage) {
  const finalPrice = price - (price * discountPercentage) / 100;
  return finalPrice;
}

function personalizedGreeting(age, gender, name) {
  return `Hello, ${name}! You are a ${age} year old ${gender}.`;
}

function getFinalPrice(price, discount, tax) {
  const finalPrice = price - (price * discount) / 100;
  const finalPriceWithTax = finalPrice + (finalPrice * tax) / 100;
  return finalPriceWithTax;
}

function getTotalExerciseTime(running, cycling, swimming) {
  const totalExerciseTime = running + cycling + swimming;
  return totalExerciseTime;
}

// Question 1: Create an endpoint that returns a welcome message
/**
 * API Call: <http://localhost:3000/welcome>
 * Expected Output: Welcome to our service!
 */
app.get("/welcome", (req, res) => {
  res.send(getWelcomeMessage());
});

// Question 2: Create an endpoint that takes a username as a query parameter and returns a greeting message.
/**
 * API Call: <http://localhost:3000/greet?username=John>
 * Expected Output: Hello, John!
 */
app.get("/greet", (req, res) => {
  const userName = req.query.username;
  res.send(getGreetingMessage(userName));
});

// Question 3: Create an endpoint that takes a password as a query parameter and returns if it is strong (length > 15) or weak.
/**
 * API Call: <http://localhost:3000/check-password?password=myverystrongpassword>
 * Expected Output: Password is strong
 */
app.get("/check-password", (req, res) => {
  const password = req.query.password;
  res.send(checkPassword(password));
});

// Question 4: Create an endpoint that takes two numbers as query parameters and returns their sum.
/**
 * API Call: <http://localhost:3000/sum?num1=5&num2=10>
 * Expected Output: 15
 */
app.get("/sum", (req, res) => {
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  res.send(`${calculateSum(num1, num2)}`);
});

// Question 5: Create an endpoint that takes a username and a boolean isSubscribed indicating subscription status, and returns a message if the user is subscribed or not.
/**
 * API Call: <http://localhost:3000/subscription-status?username=John&isSubscribed=true>
 * Expected Output: John is subscribed
 */
app.get("/subscription-status", (req, res) => {
  const username = req.query.username;
  const isSubscribed = req.query.isSubscribed;
  res.send(getSubscriptionStatus(username, isSubscribed));
});

// Question 6: Create an endpoint that takes a product price and a discount percentage, and returns the final price after discount.
/**
 * API Call: <http://localhost:3000/discounted-price?price=100&discount=10>
 * Expected Output: 90
 */
app.get("/discounted-price", (req, res) => {
  const price = parseFloat(req.query.price);
  const discount = parseFloat(req.query.discount);
  res.send(`${getDiscountPrice(price, discount)}`);
});

// Question 7: Create an endpoint that takes a user's age, gender, and name, and returns a personalized greeting message.
/**
 * API Call: <http://localhost:3000/personalized-greeting?age=25&gender=male&name=John>
 * Expected Output: Hello, John! You are a 25 year old male.
 */
app.get("/personalized-greeting", (req, res) => {
  const age = req.query.age;
  const gender = req.query.gender;
  const name = req.query.name;
  res.send(personalizedGreeting(age, gender, name));
});

// Question 8: Create an endpoint that takes a product price, discount percentage, and tax rate, and returns the final price after applying discount and tax.
/**
 * API Call: <http://localhost:3000/final-price?price=100&discount=10&tax=5>
 * Expected Output: 94.5
 */
app.get("/final-price", (req, res) => {
  const price = parseFloat(req.query.price);
  const discount = parseFloat(req.query.discount);
  const tax = parseFloat(req.query.tax);
  res.send(`${getFinalPrice(price, discount, tax)}`);
});

// Question 9: Create an endpoint that takes three fitness activity durations (running, cycling, swimming) and returns the total exercise time.
/**
 * API Call: <http://localhost:3000/total-exercise-time?running=30&cycling=40&swimming=50>
 * Expected Output: 120
 */
app.get("/total-exercise-time", (req, res) => {
  const running = parseInt(req.query.running);
  const cycling = parseInt(req.query.cycling);
  const swimming = parseInt(req.query.swimming);
  res.send(`${getTotalExerciseTime(running, cycling, swimming)}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
