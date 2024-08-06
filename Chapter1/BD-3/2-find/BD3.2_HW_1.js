const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Sample Data:
 */
let users = [
  {
    id: 1,
    username: "ankit",
    fullName: "Ankit Kumar",
    email: "ankit@gmail.com",
  },
  {
    id: 2,
    username: "dhananjit",
    fullName: "Dhananjit Singh",
    email: "dhananjit.singh@gmail.com",
  },
];

let creditCards = [
  { number: "1234567890123456", holder: "John Doe", expiry: "12/24" },
  { number: "9876543210987654", holder: "Jane Smith", expiry: "06/23" },
];

let books = [
  { isbn: "9783161484100", title: "Example Book", author: "John Author" },
  { isbn: "9781234567897", title: "Another Book", author: "Jane Writer" },
];

let people = [
  { ssn: "123-45-6789", name: "John Doe", birthDate: "1990-01-01" },
  { ssn: "987-65-4321", name: "Jane Smith", birthDate: "1985-05-05" },
];

/**
 * Exercise 1: Check username availability
 * Create an endpoint username/find/:username which accepts an username and checks if the username is available for creating a new account.
 * API Call: http://localhost:3000/username/find/ankit123
 * Note: This means that if we already have a user in the users array with the same username, we’ll have to return the response as Username is not available to indicate that the username is already taken.
 */
function checkAvailability(user, userName) {
  return user.username === userName;
}
app.get("/username/find/:username", (req, res) => {
  let userName = req.params.username;
  let result = users.find((user) => checkAvailability(user, userName));
  if (result) {
    res.json({ result: "Username is not available" });
  } else {
    res.json({ result: "Username is available" });
  }
});

/**
 * Exercise 2: Find Credit Card Number
 * Create an endpoint /credit-cards/find that accepts a cardNumber from the query parameters.
 * API Call: http://localhost:3000/credit-cards/find?cardNumber=1234567890123456
 */
function findCreditCard(card, cardNumber) {
  return card.number === cardNumber;
}
app.get("/credit-cards/find", (req, res) => {
  let cardNumber = req.query.cardNumber;
  let result = creditCards.find((card) => findCreditCard(card, cardNumber));
  if (result) {
    res.json({ creditCard: result });
  } else {
    res.json({ creditCard: "Card number is not found" });
  }
});

/**
 * Exercise 3: Find Email Address
 * Create an endpoint /emails/find that accepts an email from the query parameters.
 * API Call: http://localhost:3000/emails/find?email=ankit@gmail.com
 */
function findUserByEmail(user, email) {
  return user.email === email;
}
app.get("/emails/find", (req, res) => {
  let email = req.query.email;
  let result = users.find((user) => findUserByEmail(user, email));
  if (result) {
    res.json({ user: result });
  } else {
    res.json({ user: "User is not found" });
  }
});

/**
 * Exercise 4: Find ISBN Number ( for books )
 * Create an endpoint /books/find that accepts an isbn from the query parameters.
 * API Call: http://localhost:3000/books/find?isbn=9783161484100
 */
function findBookByISBN(book, isbn) {
  return book.isbn === isbn;
}
app.get("/books/find", (req, res) => {
  let isbn = req.query.isbn;
  let result = books.find((book) => findBookByISBN(book, isbn));
  if (result) {
    res.json({ book: result });
  } else {
    res.json({ book: "Book is not found" });
  }
});

/**
 * Exercise 5: Find Social Security Number (SSN)
 * Create an endpoint /ssn/find that accepts an ssn from the query parameters.
 * API Call: http://localhost:3000/ssn/find?ssn=123-45-6789
 */
function findPersonBySSN(person, ssn) {
  return person.ssn === ssn;
}
app.get("/ssn/find", (req, res) => {
  let ssn = req.query.ssn;
  let result = people.find((person) => findPersonBySSN(person, ssn));
  if (result) {
    res.json({ person: result });
  } else {
    res.json({ person: "Person is not found" });
  }
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
