const express = require("express");
const app = express();
const PORT = 3000;
let cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Stock portfolio analysis API!");
});

/**
 * Endpoint 1: Calculate the Returns of the Stocks added
 * Create an endpoint that takes three variables as query parameters and returns total Return Value of the stocks.
 * API Call: <http://localhost:3000/calculate-returns?boughtAt=300&marketPrice=400&quantity=2>
 * Expected Output: 200
 */
app.get("/calculate-returns", (req, res) => {
  const boughtAt = parseFloat(req.query.boughtAt);
  const marketPrice = parseFloat(req.query.marketPrice);
  const quantity = parseInt(req.query.quantity);
  const result = (marketPrice - boughtAt) * quantity;
  res.send(`${result}`);
});

/**
 * Endpoint 2: Calculate the Total Returns
 * Create an endpoint that takes four variables as query parameters and returns total return value of all the stocks.
 * API Call: <http://localhost:3000/total-returns?stock1=100&stock2=200&stock3=200&stock4=400>
 * Expected Output: 900
 */
app.get("/total-returns", (req, res) => {
  const stock1 = parseFloat(req.query.stock1);
  const stock2 = parseFloat(req.query.stock2);
  const stock3 = parseFloat(req.query.stock3);
  const stock4 = parseFloat(req.query.stock4);
  const result = stock1 + stock2 + stock3 + stock4;
  res.send(`${result}`);
});

/**
 * Endpoint 3: Calculate the Return Percentage
 * Create an endpoint that takes two variables as query parameters and returns total ReturnPercentage of the stocks.
 * API Call: <http://localhost:3000/calculate-return-percentage?boughtAt=400&returns=200>
 * Expected Output: 50
 */
app.get("/calculate-return-percentage", (req, res) => {
  const boughtAt = parseFloat(req.query.boughtAt);
  const returns = parseFloat(req.query.returns);
  const result = (returns / boughtAt) * 100;
  res.send(`${result}`);
});

/**
 * Endpoint 4: Calculate the Total Return Percentage
 * Create an endpoint that takes four variables as query parameters and returns total return percentage of all the stocks.
 * API Call: <http://localhost:3000/total-return-percentage?stock1=10&stock2=20&stock3=20&stock4=40>
 * Expected Output: 90
 */
app.get("/total-return-percentage", (req, res) => {
  const stock1 = parseFloat(req.query.stock1);
  const stock2 = parseFloat(req.query.stock2);
  const stock3 = parseFloat(req.query.stock3);
  const stock4 = parseFloat(req.query.stock4);
  const result = stock1 + stock2 + stock3 + stock4;
  res.send(`${result}`);
});

/**
 * Endpoint 5: Identify the Status of Stocks based on their Return Value
 * Create an endpoint that takes returnPercentage as query parameter and returns the stock status.
 * API Call: <http://localhost:3000/status?returnPercentage=90>
 * Expected Output: profit
 */
app.get("/status", (req, res) => {
  const returnPercentage = parseFloat(req.query.returnPercentage);
  let result = "";
  if (returnPercentage > 0) {
    result = "profit";
  } else {
    result = "loss";
  }
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
