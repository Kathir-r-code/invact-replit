const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let employees = [
  { id: 1, name: "John Doe", position: "Software Engineer" },
  { id: 2, name: "Jane Smith", position: "Product Manager" },
  { id: 3, name: "Sam Johnson", position: "Designer" },
];

function getEmployees() {
  return employees;
}

function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}

function addEmployee(employee) {
  employees.push(employee);
  return employee;
}

app.get("/employees", (req, res) => {
  res.json(getEmployees());
});

app.get("/employees/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = getEmployeeById(id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

app.post("/employees/new", (req, res) => {
  let id = req.query.id;
  let name = req.query.name;
  let position = req.query.position;
  let addedEmployee = addEmployee({ id, name, position });
  res.status(201).json(addedEmployee);
});

module.exports = {
  app,
  PORT,
  getEmployees,
  getEmployeeById,
  addEmployee,
};
