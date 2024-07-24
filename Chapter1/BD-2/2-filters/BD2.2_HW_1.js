const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Question 1: Write an Express code snippet to filter temperatures above 25 degrees Celsius.
 * Define an endpoint /high-temperatures using the get method.
 * Given Data: [22, 26, 19, 30, 23, 28, 17, 31]
 * API Call: <http://localhost:3000/high-temperatures>
 * Expected Output: [26, 30, 28, 31]
 */
function filterHighTemperatures(temperature) {
  return temperature > 25;
}
const temperatures = [22, 26, 19, 30, 23, 28, 17, 31];
app.get("/high-temperatures", (req, res) => {
  let result = temperatures.filter((temperature) =>
    filterHighTemperatures(temperature),
  );
  res.json(result);
});

/**
 * Question 2: Write an Express code snippet to filter prices less than or equal to 100 rupees.
 * Given Data: [80, 120, 95, 150, 60, 110]
 * API Call: <http://localhost:3000/low-prices>
 * Expected Output: [80, 95, 60]
 */
function filterLowPrices(price, maxValue) {
  return price <= maxValue;
}
const prices = [80, 120, 95, 150, 60, 110];
const MAXVALUE = 100;
app.get("/low-prices", (req, res) => {
  let result = prices.filter((price) => filterLowPrices(price, MAXVALUE));
  res.json(result);
});

/**
 * Question 3: Write an Express code snippet to filter product ratings greater than 3.5.
 * Given Data: [4.2, 3.8, 2.5, 4.7, 3.0, 4.9, 3.6]
 * API Call:<http://localhost:3000/high-ratings>
 * Expected Output: [4.2, 3.8, 4.7, 4.9, 3.6]
 */
function filterHighRatings(rating, maxRating) {
  return rating > maxRating;
}
const ratings = [4.2, 3.8, 2.5, 4.7, 3.0, 4.9, 3.6];
app.get("/high-ratings", (req, res) => {
  const MAXRATING = 3.5;
  let result = ratings.filter((rating) => filterHighRatings(rating, MAXRATING));
  res.json(result);
});

/**
 * Question 4:Write an Express code snippet to filter Indian names longer than 6 characters.
 * Given Data: ['Akshay', 'Priyanka', 'Arjun', 'Anushka', 'Rajesh', 'Kavita']
 * API Call: <http://localhost:3000/long-indian-names>
 * Expected Output: ['Priyanka', “Anushka“]
 */
function filterLongIndianNames(name, maxLength) {
  return name.length > maxLength;
}
const names = ["Akshay", "Priyanka", "Arjun", "Anushka", "Rajesh", "Kavita"];
app.get("/long-indian-names", (req, res) => {
  const MAXLENGTH = 6;
  let result = names.filter((name) => filterLongIndianNames(name, MAXLENGTH));
  res.json(result);
});

/**
 * Question 5: Write an Express code snippet to filter products cheaper than a certain price.
 * Given Data: [10, 25, 50, 75, 100, 150, 200]
 * API Call: http://localhost:3000/cheaper-products?filterParam=100
 * Expected Output: [10, 25, 50, 75]
 */
function filterCheaperProducts(price, maxPrice) {
  return price < maxPrice;
}
const productPrices = [10, 25, 50, 75, 100, 150, 200];
app.get("/cheaper-products", (req, res) => {
  const filterParam = parseInt(req.query.filterParam);
  let result = productPrices.filter((price) =>
    filterCheaperProducts(price, filterParam),
  );
  res.json(result);
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
