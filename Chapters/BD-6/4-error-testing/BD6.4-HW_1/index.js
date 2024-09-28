let {
  getEmployees,
  getEmployeeById,
  getDepartments,
  getDepartmentById,
} = require('./employee');
const express = require('express');
const { resolve } = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Get All employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await getEmployees();
    if (employees.length === 0) {
      return res.status(404).json({ error: 'No employees found.' });
    }
    return res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a employee by ID
app.get('/api/employees/:id', async (req, res) => {
  try {
    const employee = await getEmployeeById(parseInt(req.params.id));
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }
    return res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get All departments
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await getDepartments();
    if (departments.length === 0) {
      return res.status(404).json({ error: 'No departments found.' });
    }
    return res.json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a department by ID
app.get('/api/departments/:id', async (req, res) => {
  try {
    const department = await getDepartmentById(parseInt(req.params.id));
    if (!department) {
      return res.status(404).json({ error: 'Department not found.' });
    }
    return res.json(department);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = { app, PORT };
