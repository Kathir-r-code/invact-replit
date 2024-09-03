const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
const { getEmployees, getEmployeeById, addNewEmployee } = require("./employee");

app.get("/employees", (req, res) => {
  res.json(getEmployees());
});

app.get("/employees/:id", (req, res) => {
  const employee = getEmployeeById(parseInt(req.params.id));
  if (!employee) {
    return res.status(404).json({ message: "employee not found" });
  }
  res.json(employee);
});

app.post("/employees", (req, res) => {
  const employee = addNewEmployee(req.body.newEmployee);
  res.status(201).json(employee);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
