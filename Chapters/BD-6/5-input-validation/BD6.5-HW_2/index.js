const express = require('express');
const { resolve } = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

let employees = [];

function validateEmployee(employee) {
  if (!employee.name || typeof employee.name !== 'string') {
    return 'Name is required and should be a string';
  }
  if (!employee.companyId || typeof employee.companyId !== 'number') {
    return 'Company Id is required and should be a number';
  }

  return null;
}

app.post('/api/employees', (req, res) => {
  let error = validateEmployee(req.body);
  if (error) {
    res.status(400).send(error);
  }
  let employee = { id: employees.length + 1, ...req.body };
  employees.push(employee);
  res.status(201).json(employee);
});

let companies = [];

function validateCompany(company) {
  if (!company.name || typeof company.name !== 'string') {
    return 'Name is required and should be a string';
  }
  return null;
}
app.post('/api/companies', (req, res) => {
  let error = validateCompany(req.body);
  if (error) {
    res.status(400).send(error);
  }
  let company = { id: companies.length + 1, ...req.body };
  companies.push(company);
  res.status(201).json(company);
});

module.exports = { app, PORT, validateEmployee, validateCompany };
