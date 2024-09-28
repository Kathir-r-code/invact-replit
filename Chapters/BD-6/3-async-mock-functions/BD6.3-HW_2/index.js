const express = require("express");
const { resolve } = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("static"));
app.use(express.json());

let employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Engineering",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "Marketing",
  },
];

async function getAllEmployees() {
  return employees;
}

async function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}

async function addEmployee(employee) {
  employee.id = employees.length + 1;
  employees.push(employee);
  return employee;
}

// Get All employees
app.get("/employees", async (req, res) => {
  const employees = await getAllEmployees();
  res.json(employees);
});

// Get a employee by ID
app.get("/employees/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const employee = await getEmployeeById(id);
  if (!employee) {
    return res.status(404).send("Employee not found");
  }
  res.json(employee);
});

// Add a new employee
app.post("/employees/new", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const department = req.body.department;
  const newEmployee = await addEmployee({ name, email, department });
  res.status(201).json(newEmployee);
});

module.exports = {
  app,
  PORT,
  getAllEmployees,
  getEmployeeById,
  addEmployee,
};
