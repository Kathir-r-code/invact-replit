const express = require("express");
const app = express();
const PORT = 3000;

// Question 1: Body Mass Index (BMI) Calculator
app.get("/bmi", (req, res) => {
  const weight = parseFloat(req.query.weight);
  const height = parseFloat(req.query.height);
  const bmi = `${weight / (height * height)}`;
  res.send(bmi);
});

// Question 2: Calculate grocery checkout price
app.get("/checkout", (req, res) => {
  const product = req.query.product;
  const units = parseFloat(req.query.units);
  const price = parseFloat(req.query.price);
  const total_price = `${units * price}`;
  res.send(`Your total for ${units} ${product} is ${total_price}`);
});

// Question 3: Calculate grade percentage
app.get("/grade", (req, res) => {
  const maths = parseInt(req.query.maths);
  const science = parseInt(req.query.science);
  const english = parseInt(req.query.english);
  const gradeInPercentage = `${Math.round(((maths + science + english) / 300) * 100)}`;
  res.send(`Your grade in percentage is ${gradeInPercentage}%`);
});

// Question 4: Return bill amount after applying discount
app.get("/discounted-price", (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const discount = parseFloat(req.query.discount);
  const discountPrice = `${cartTotal - cartTotal * (discount / 100)}`;
  res.send(discountPrice);
});

// Question 5: Split bill among friends
app.get("/split-bill", (req, res) => {
  const billAmount = parseFloat(req.query.billAmount);
  const numberOfFriends = parseInt(req.query.numberOfFriends);
  const splitAmount = `${billAmount / numberOfFriends}`;
  res.send(`Each friend owes Rs.${splitAmount} against the bill`);
});

// Question 6: Convert Celsius to Fahrenheit
app.get("/celsius-to-fahrenheit", (req, res) => {
  const celsius = parseFloat(req.query.temperature);
  const fahrenheit = `${(celsius * 9) / 5 + 32}`;
  res.send(`${fahrenheit} Fahrenheit`);
});

// Question 7: Calculate monthly salary
app.get("/monthly-salary", (req, res) => {
  const totalHours = parseFloat(req.query.totalHours);
  const hourlyWage = parseFloat(req.query.hourlyWage);
  const monthlySalary = `${totalHours * hourlyWage}`;
  res.send(`Your monthly salary is ₹${monthlySalary}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
