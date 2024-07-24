const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

app.use(cors());

// Serverside values
let taxRate = 5; // 5%
let discountPercent = 10; // 10%
let loyaltyRate = 2; // 2 points per Rs.1

/**
 * Endpoint 1: Calculate the total price of items in the cart
 * Create an endpoint that takes a newItemPrice and cartTotal as a query parameter and returns total cart value.
 * API Call: <http://localhost:3000/cart-total?newItemPrice=1200&cartTotal=0>
 * Expected Output: 1200
 */
app.get("/cart-total", (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);
  const total = newItemPrice + cartTotal;
  res.send(`${total}`);
});

/**
 * Endpoint 2 : Apply a discount based on membership status
 * Create an endpoint that takes a cartTotal and isMember as a query parameter and returns final price after applying the discount.
 * API Call: <http://localhost:3000/membership-discount?cartTotal=3600&isMember=true>
 * Expected Output: 3240
 */
app.get("/membership-discount", (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember;
  const discount =
    isMember === "true" ? cartTotal - cartTotal * (discountPercent / 100) : 0;
  res.send(`${discount}`);
});

/**
 * Endpoint 3 : Calculate tax on the cart total
 * Create an endpoint that takes a cartTotal as a query parameter and returns the tax applied on the Cart Total.
 * API Call: <http://localhost:3000/calculate-tax?cartTotal=3600>
 * Expected Output: 180
 */
app.get("/calculate-tax", (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const tax = cartTotal * (taxRate / 100);
  res.send(`${tax}`);
});

/**
 * Endpoint 4 : Estimate delivery time based on shipping method
 * Create an endpoint that takes a shippingMethod and distance as a query parameter and returns the number of days for delivering the package.
 * API Call: <http://localhost:3000/estimate-delivery?shippingMethod=express&distance=600>
 * Expected Output: 6
 */
app.get("/estimate-delivery", (req, res) => {
  const shippingMethod = req.query.shippingMethod;
  const distance = parseFloat(req.query.distance);
  let deliveryTime = 0;
  if (shippingMethod === "express") {
    deliveryTime = distance / 100;
  } else {
    deliveryTime = distance / 50;
  }
  res.send(`${deliveryTime}`);
});

/**
 * Endpoint 5 : Calculate the shipping cost based on weight and distance
 * Create an endpoint that takes weight and distance as query parameters and returns the shipping cost of the packages.
 * API Call: <http://localhost:3000/shipping-cost?weight=2&distance=600>
 * Expected Output: 120
 */
app.get("/shipping-cost", (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);
  const result = weight * distance * 0.1;
  res.send(`${result}`);
});

/**
 * Endpoint 6 : Calculate loyalty points earned from a purchase
 * Create an endpoint that takes purchaseAmount as query parameters and returns the loyalty points.
 * API Call: <http://localhost:3000/loyalty-points?purchaseAmount=3600>
 * Expected Output: 7200
 */
app.get("/loyalty-points", (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);
  const loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(`${loyaltyPoints}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
