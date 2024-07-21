let express = require("express");
let app = express();
const PORT = 3000;

app.get("/shout", (req, res) => {
  let _name = req.query.name;
  res.send(_name.toUpperCase());
});

app.get("/fullname", (req, res) => {
  let _firstName = req.query.firstName;
  let _lastName = req.query.lastName;
  const _name = `${_firstName} ${_lastName}`;
  res.send(_name);
});

app.get("/date", (req, res) => {
  const _month = req.query.month;
  const _year = req.query.year;
  res.send(`${_month}, ${_year}`);
});

app.get("/greet", (req, res) => {
  const _name = req.query.name;
  res.send(`Namaste, ${_name}!`);
});

app.get("/address", (req, res) => {
  const _street = req.query.street;
  const _city = req.query.city;
  const _state = req.query.state;
  res.send(`${_street}, ${_city}, ${_state}`);
});

app.get("/email", (req, res) => {
  const _name = req.query.name;
  const _domain = req.query.domain;
  res.send(`Your email is ${_name}@${_domain}`);
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
