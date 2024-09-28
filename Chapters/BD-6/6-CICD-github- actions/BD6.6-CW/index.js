const cors = require('cors');
const express = require('express');
const { getAllEmployees, getEmployeesById } = require('./controllers');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/employees', async (req, res) => {
  const employees = getAllEmployees();
  res.json({ employees });
});

app.get('/employees/details/:id', async (req, res) => {
  const employees = getEmployeesById(parseInt(req.params.id));
  res.json({ employees });
});

module.exports = { app };
