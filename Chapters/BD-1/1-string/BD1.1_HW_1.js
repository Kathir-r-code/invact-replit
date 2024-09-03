const express = require("express");
const app = express();
const PORT = 3000;

app.get("/whisper", (req, res) => {
  const name = req.query.name;
  const formattedName = name.toLowerCase();
  res.send(formattedName);
});

app.get("/full-product-name", (req, res) => {
  const companyName = req.query.companyName;
  const productName = req.query.productName;
  const fullProductName = `${companyName} ${productName}`;
  res.send(fullProductName);
});

app.get("/date", (req, res) => {
  const month = req.query.month;
  const year = req.query.year;
  const formattedDate = `${month}/${year}`;
  res.send(formattedDate);
});

app.get("/greet", (req, res) => {
  const city = req.query.city;
  const greeting = `You live in ${city}`;
  res.send(greeting);
});

app.get("/capital", (req, res) => {
  const capital = req.query.capital;
  const country = req.query.country;
  const countryCapital = `${capital} is the capital of ${country}`;
  res.send(countryCapital);
});

app.get("/email", (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const domain = req.query.domain;
  const email = `${firstName}.${lastName}@${domain}`;
  res.send(email);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
