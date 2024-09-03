const express = require("express");
let cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());

// Shopping Cart Operations - Cart Data
let cart = [
  { productId: 1, name: "Laptop", price: 50000, quantity: 1 },
  { productId: 2, name: "Mobile", price: 20000, quantity: 2 },
];

/**
 * Endpoint 1: Add an Item to the Cart
 * Objective: Add a new item to the cart using the provided details.
 * Endpoint: /cart/add
 * API Call : http://localhost:3000/cart/add?productId=3&name=Tablet&price=15000&quantity=1
 */
function addItemToCart(_cart, productId, name, price, quantity) {
  let newItem = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  _cart.push(newItem);
  return _cart;
}
app.get("/cart/add", (req, res) => {
  const productId = parseInt(req.query.productId);
  const name = req.query.name;
  const price = parseFloat(req.query.price);
  const quantity = parseInt(req.query.quantity);
  result = addItemToCart(cart, productId, name, price, quantity);
  res.json({ cartItems: result });
});

/**
 * Endpoint 2: Edit Quantity of an Item in the Cart
 * Objective: Edit the quantity of an existing item in the cart based on the product ID.
 * Endpoint: /cart/edit
 * Example Call: http://localhost:3000/cart/edit?productId=2&quantity=3
 */
function updateProductQuantityById(_cart, productId, quantity) {
  for (let i = 0; i < _cart.length; i++) {
    if (_cart[i].productId === productId) {
      _cart[i].quantity = quantity;
      break;
    }
  }
  return _cart;
}
app.get("/cart/edit", (req, res) => {
  const productId = parseInt(req.query.productId);
  const quantity = parseInt(req.query.quantity);
  result = updateProductQuantityById(cart, productId, quantity);
  res.json({ cartItems: result });
});

/**
 * Endpoint 3: Delete an Item from the Cart
 * Objective: Delete an item from the cart based on the product ID.
 * Endpoint: /cart/delete
 * Example Call: http://localhost:3000/cart/delete?productId=1
 */
function deleteProductById(product, productId) {
  return product.productId !== productId;
}
app.get("/cart/delete", (req, res) => {
  const productId = parseInt(req.query.productId);
  cart = cart.filter((product) => deleteProductById(product, productId));
  res.json({ cartItems: cart });
});

/**
 * Endpoint 4: Read Items in the Cart
 * Objective: Return the current list of items in the cart.
 * Endpoint: /cart
 * Example Call: http://localhost:3000/cart
 */
function getCartItems() {
  return cart;
}
app.get("/cart", (req, res) => {
  let result = getCartItems();
  res.json({ cartItems: result });
});

/**
 * Endpoint 5: Calculate Total Quantity of Items in the Cart
 * Objective: Calculate and return the total quantity of items in the cart.
 * Endpoint: /cart/total-quantity
 * Example Call: http://localhost:3000/cart/total-quantity
 * Expected Output: { 'totalQuantity': 3 }
 */
function calculateTotalQuantity(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}
app.get("/cart/total-quantity", (req, res) => {
  let result = calculateTotalQuantity(cart);
  res.json({ totalQuantity: result });
});

/**
 * Endpoint 6: Calculate Total Price of Items in the Cart
 * Objective: Calculate and return the total price of items in the cart based on their quantities and individual prices.
 * Endpoint: /cart/total-price
 * Example Call: http://localhost:3000/cart/total-price
 * Expected Output: { 'totalPrice': 90000 }
 */
function calculateTotalPrice(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}
app.get("/cart/total-price", (req, res) => {
  let result = calculateTotalPrice(cart);
  res.json({ totalPrice: result });
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
