const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Sample Data:
 */
let phones = [
  { number: "123-456-7890", owner: "Alice", type: "mobile" },
  { number: "987-654-3210", owner: "Bob", type: "home" },
];

let accounts = [
  { number: "111122223333", holder: "Charlie", balance: 5000 },
  { number: "444455556666", holder: "Dave", balance: 3000 },
];

let licenses = [
  { number: "D1234567", name: "Eve", expiryDate: "2026-04-01" },
  { number: "D7654321", name: "Frank", expiryDate: "2024-11-15" },
];

let employees = [
  { id: "E1234", name: "Grace", department: "Engineering" },
  { id: "E5678", name: "Hank", department: "Marketing" },
];

let orders = [
  { id: "ORD12345", customerName: "Ivy", totalAmount: 150 },
  { id: "ORD67890", customerName: "Jake", totalAmount: 200 },
];

/**
 * Exercise 1: Find Mobile Phone Number
 * Create an endpoint /phones/find that accepts a phoneNumber from the query parameters.
 * API Call: <http://localhost:3000/phones/find?phoneNumber=123-456-7890>
 */
function findPhoneNumber(phone, phoneNumber) {
  return phone.number === phoneNumber;
}
app.get("/phones/find", (req, res) => {
  console.log("hi");
  const phoneNumber = req.query.phoneNumber;
  const foundPhone = phones.find((phone) =>
    findPhoneNumber(phone, phoneNumber),
  );
  if (foundPhone) {
    res.json({ phone: foundPhone });
  } else {
    res.json({ phone: "Not found" });
  }
});

/**
 * Exercise 2: Find Bank Account Number
 * Create an endpoint /accounts/find that accepts an accountNumber from the query parameters.
 * API Call: <http://localhost:3000/accounts/find?accountNumber=111122223333>
 */
function findAccountNumber(account, accountNumber) {
  return account.number === accountNumber;
}
app.get("/accounts/find", (req, res) => {
  const accountNumber = req.query.accountNumber;
  const foundAccount = accounts.find((account) =>
    findAccountNumber(account, accountNumber),
  );
  if (foundAccount) {
    res.json({ account: foundAccount });
  } else {
    res.json({ account: "Not found" });
  }
});

/**
 * Exercise 3: Find Driver's License Number
 * Create an endpoint /licenses/find that accepts a licenseNumber from the query parameters.
 * API Call: <http://localhost:3000/licenses/find?licenseNumber=D1234567>
 */
function findLicenseNumber(license, licenseNumber) {
  return license.number === licenseNumber;
}
app.get("/licenses/find", (req, res) => {
  const licenseNumber = req.query.licenseNumber;
  const foundLicense = licenses.find((license) =>
    findLicenseNumber(license, licenseNumber),
  );
  if (foundLicense) {
    res.json({ license: foundLicense });
  } else {
    res.json({ license: "Not found" });
  }
});

/**
 * Exercise 4: Find Employee ID
 * Create an endpoint /employees/find that accepts an employeeId from the query parameters.
 * API Call: <http://localhost:3000/employees/find?employeeId=E1234>
 */
function findEmployeeId(employee, employeeId) {
  return employee.id === employeeId;
}
app.get("/employees/find", (req, res) => {
  const employeeId = req.query.employeeId;
  const foundEmployee = employees.find((employee) =>
    findEmployeeId(employee, employeeId),
  );
  if (foundEmployee) {
    res.json({ employee: foundEmployee });
  } else {
    res.json({ employee: "Not found" });
  }
});

/**
 * Exercise 5: Find Order ID
 * Create an endpoint /orders/find that accepts an orderId from the query parameters.
 * API Call: <http://localhost:3000/orders/find?orderId=ORD12345>
 */
function findOrderById(order, orderId) {
  return order.id === orderId;
}
app.get("/orders/find", (req, res) => {
  const orderId = req.query.orderId;
  const foundOrder = orders.find((order) => findOrderById(order, orderId));
  if (foundOrder) {
    res.json({ order: foundOrder });
  } else {
    res.json({ order: "Not found" });
  }
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
