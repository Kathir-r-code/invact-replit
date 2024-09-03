const express = require("express");
const app = express();
const PORT = 3000;

// Sample data
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let names = ["Rahul", "Sita", "Amit", "Vikram", "Priya"];
let employees = [
  { employeeId: 1, name: "Rahul" },
  { employeeId: 2, name: "Sita" },
  { employeeId: 3, name: "Amit" },
];

let contacts = [
  { phoneNumber: "1234567890", name: "Rahul", address: "123 Street, City" },
  { phoneNumber: "0987654321", name: "Sita", address: "456 Avenue, City" },
  { phoneNumber: "1112223334", name: "Amit", address: "789 Boulevard, City" },
];

/**
 * Exercise 1: Find a Number in the Array
 * Create an endpoint numbers/find that finds a specific number in an array of unique numbers.
 * API Call: <http://localhost:3000/numbers/find/5>
 * Expected Output: 5
 */
function findNumber(num, numberToFind) {
  return num === numberToFind;
}
app.get("/numbers/find/:number", (req, res) => {
  const numberToFind = parseInt(req.params.number);
  const result = numbers.find((num) => findNumber(num, numberToFind));
  res.json(result);
});

/**
 * Exercise 2:Find a Name in the Array
 * Create an endpoint names/find/:name that finds a specific name in an array of unique names.
 * API Call: <http://localhost:3000/names/find/Sita>
 * Expected Output: 'Sita'
 */
function findName(name, nameToFind) {
  return name === nameToFind;
}
app.get("/names/find/:name", (req, res) => {
  const nameToFind = req.params.name;
  const result = names.find((name) => findName(name, nameToFind));
  res.json(result);
});

/**
 * Exercise 3: Find an Employee by ID
 * Create an endpoint employees/find/:id that finds an employee by their unique employee ID.
 * API Call: <http://localhost:3000/employees/find/2>
 * Expected Output: { 'employeeId': 2, 'name': 'Sita' }
 */
function findEmployeeById(employee, employeeIdToFind) {
  return employee.employeeId === employeeIdToFind;
}
app.get("/employees/find/:id", (req, res) => {
  const employeeIdToFind = parseInt(req.params.id);
  const result = employees.find((employee) =>
    findEmployeeById(employee, employeeIdToFind),
  );
  res.json(result);
});

/**
 * Exercise 4: Find a Contact by Phone Number
 * Create an endpoint /contacts/find/:phoneNumber that finds a contact by their unique phone number.
 * API Call: <http://localhost:3000/contacts/find/1234567890>
 * Expected Output: { 'phoneNumber': '1234567890', 'name': 'Rahul', 'address': '123 Street, City' }
 */
function findContactByPhoneNumber(contact, phoneNumberToFind) {
  return contact.phoneNumber === phoneNumberToFind;
}
app.get("/contacts/find/:phoneNumber", (req, res) => {
  const phoneNumberToFind = req.params.phoneNumber;
  const result = contacts.find((contact) =>
    findContactByPhoneNumber(contact, phoneNumberToFind),
  );
  res.json(result);
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
