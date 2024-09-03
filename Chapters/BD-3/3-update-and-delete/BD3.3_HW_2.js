const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Example 1: Remove Out of Stock Products
 * Create an endpoint /products/remove-out-of-stock to return all the products currently in stock & remove the products that are out of stock
 * API Call: http://localhost:3000/products/remove-out-of-stock
 */
// Sample data
let products = [
  { productId: 1, name: "Laptop", inStock: true },
  { productId: 2, name: "Phone", inStock: true },
  { productId: 3, name: "Tablet", inStock: false },
];
function removeOutOfStockProducts(product) {
  return product.inStock;
}
app.get("/products/remove-out-of-stock", (req, res) => {
  let result = products.filter((product) => removeOutOfStockProducts(product));
  res.send(result);
});

/**
 * Example 2: Update Employee Active Status by ID
 * Create an endpoint /employees/update to update the status of an employee
 * API call: http://localhost:3000>/employees/update?employeeId=1&active=false
 */
// Sample data
let employees = [
  { employeeId: 1, name: "Alice", active: true },
  { employeeId: 2, name: "Bob", active: true },
  { employeeId: 3, name: "Charlie", active: false },
];
function updateEmployeeStatusById(employees, employeeId, active) {
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].employeeId === employeeId) {
      employees[i].active = active;
      break;
    }
  }
  return employees;
}
app.get("/employees/update", (req, res) => {
  let employeeId = parseInt(req.query.employeeId);
  let active = req.query.active === "true";
  let result = updateEmployeeStatusById(employees, employeeId, active);
  res.json(result);
});

/**
 * Example 3: Update Order Delivery Status by ID
 * Create an endpoint /orders/update to update the delivery status of an order
 * API call: http://localhost:3000/orders/update?orderId=1&delivered=true
 */
// Sample data
let orders = [
  { orderId: 1, product: "Laptop", delivered: false },
  { orderId: 2, product: "Phone", delivered: true },
  { orderId: 3, product: "Tablet", delivered: false },
];
function updateOrderStatusById(orders, orderId, delivered) {
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].orderId === orderId) {
      orders[i].delivered = delivered;
      break;
    }
  }
  return orders;
}
app.get("/orders/update", (req, res) => {
  let orderId = parseInt(req.query.orderId);
  let delivered = req.query.delivered === "true";
  let result = updateOrderStatusById(orders, orderId, delivered);
  res.json(result);
});

/**
 * Example 4: Remove Unconfirmed Reservations
 * Create an endpoint /reservations/remove-unconfirmed to remove unconfirmed reservations & return only the confirmed ones.
 * API call: http://localhost:3000/reservations/remove-unconfirmed
 */
// Sample data
let reservations = [
  { reservationId: 1, name: "John", confirmed: false },
  { reservationId: 2, name: "Jane", confirmed: true },
  { reservationId: 3, name: "Jack", confirmed: false },
];
function removeUnconfirmedReservations(reservation) {
  return reservation.confirmed;
}
app.get("/reservations/remove-unconfirmed", (req, res) => {
  let result = reservations.filter((reservation) =>
    removeUnconfirmedReservations(reservation),
  );
  res.json(result);
});

/**
 * Example 5: Update Subscription Status by ID
 * Create an endpoint /subscriptions/update to update the status of a subscription.
 * API Call: http://localhost:3000/subscriptions/update?subscriptionId=1&active=true
 */
// Sample data
let subscriptions = [
  { subscriptionId: 1, service: "Netflix", active: false },
  { subscriptionId: 2, service: "Spotify", active: true },
  { subscriptionId: 3, service: "Amazon Prime", active: false },
];
function updateSubscriptionStatusById(subscriptions, subscriptionId, active) {
  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].subscriptionId === subscriptionId) {
      subscriptions[i].active = active;
      break;
    }
  }
  return subscriptions;
}
app.get("/subscriptions/update", (req, res) => {
  let subscriptionId = parseInt(req.query.subscriptionId);
  let active = req.query.active === "true";
  let result = updateSubscriptionStatusById(
    subscriptions,
    subscriptionId,
    active,
  );
  res.json(result);
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
