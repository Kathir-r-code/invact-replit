const express = require("express");
const app = express();
const PORT = 3000;

// Define the object on the serve: Person
let person = {
  firstName: "Amit",
  lastName: "Sharma",
  age: 30,
  gender: "male",
  isMember: true,
};

/**
 * Exercise 1: Return the Person Object
 * API Call: <http://localhost:3000/person>
 */
app.get("/person", (req, res) => {
  res.json(person);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
