const express = require("express");
const app = express();
const PORT = 3000;

app.get("/total-marks", (req, res) => {
  const marks1 = parseFloat(req.query.marks1);
  const marks2 = parseFloat(req.query.marks2);
  const totalMarks = `${marks1 + marks2}`;
  res.send(totalMarks);
});

app.get("/total-weight", (req, res) => {
  const weight1 = parseFloat(req.query.weight1);
  const weight2 = parseFloat(req.query.weight2);
  const weight3 = parseFloat(req.query.weight3);
  const totalWeight = `${weight1 + weight2 + weight3}`;
  res.send(totalWeight);
});

app.get("/monthly-salary", (req, res) => {
  const annualSalary = parseFloat(req.query.annualSalary);
  const monthlySalary = `${annualSalary / 12}`;
  res.send(monthlySalary);
});

app.get("/total-pages", (req, res) => {
  const pagesPerDay = parseFloat(req.query.pagesPerDay);
  const days = parseFloat(req.query.days);
  const totalPages = `${pagesPerDay * days}`;
  res.send(totalPages);
});

app.get("/currency-conversion", (req, res) => {
  const amount = parseFloat(req.query.amount);
  const exchangeRate = parseFloat(req.query.exchangeRate);
  const convertedAmount = `${amount * exchangeRate}`;
  res.send(convertedAmount);
});

app.get("/average-sales", (req, res) => {
  const sales1 = parseFloat(req.query.sales1);
  const sales2 = parseFloat(req.query.sales2);
  const sales3 = parseFloat(req.query.sales3);
  const avgSales = (sales1 + sales2 + sales3) / 3;
  res.send(avgSales.toString());
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
