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

/**
 * Exercise 2: Access the Full Name of the Person
 * API Call: <http://localhost:3000/person/fullname>
 */
function getFullName(person) {
  return `${person.firstName} ${person.lastName}`;
}

app.get("/person/fullname", (req, res) => {
  let fullName = getFullName(person);
  res.json({ fullName: fullName });
});

/**
 * Exercise 3: Access Just the First Name and Gender of the Person
 * API Call: <http://localhost:3000/person/firstname-gender>
 */
function getFirstNameandGender(person) {
  let { firstName, gender } = person;
  return { firstName, gender };
}

app.get("/person/firstname-gender", (req, res) => {
  let firstNameAndGender = getFirstNameandGender(person);
  res.json(firstNameAndGender);
});

/**
 * Exercise 4: Increment the Age of the Person and Return the Updated Object
 * <http://localhost:3000/person/increment-age>
 */
function getIncreasetAge(person) {
  person.age += 1;
  return person;
}

app.get("/person/increment-age", (req, res) => {
  let updatedPerson = getIncreasetAge(person);
  res.json(updatedPerson);
});

/**
 * Exercise 5: Return the Full Name and Membership Status of the Person
 * API Call: <http://localhost:3000/person/fullname-membership>
 */
function getFullNameAndMembership(person) {
  let fullName = getFullName(person);
  let membershipStatus = person.isMember;
  return { fullName: fullName, isMember: membershipStatus };
}

app.get("/person/fullname-membership", (req, res) => {
  let fullNameAndMembership = getFullNameAndMembership(person);
  res.json(fullNameAndMembership);
});

/**
 * Exercise 6: Get Final Price After Discount for Members
 * Create an endpoint /person/final-price that takes the cart total and returns the final price after applying a 10% discount if the person is a member.
 * API Call: <http://localhost:3000/person/final-price?cartTotal=1000>
 * Expected Output: { finalPrice: 900.00 }
 */
function getFinalPrice(isMember, cartTotal) {
  let finalPrice = cartTotal;
  if (isMember) {
    finalPrice = cartTotal - cartTotal * 0.1;
  }
  return finalPrice;
}

app.get("/person/final-price", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getFinalPrice(person.isMember, cartTotal);
  res.json({ finalPrice: finalPrice.toFixed(2) });
});

/**
 * Exercise 7: Get Shipping Cost Based on Cart Total and Membership Status
 * Create an endpoint /person/shipping-cost that takes the cart total and returns the shipping cost. Note: > 500 & isMember  = 0 else 99
 * API Call: <http://localhost:3000/person/shipping-cost?cartTotal=600>
 */
function getShippingCost(isMember, cartTotal) {
  let shippingCost = isMember && cartTotal > 500 ? 0 : 99;
  return shippingCost;
}

app.get("/person/shipping-cost", (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  let shippingCost = getShippingCost(cartTotal, person.isMember);
  res.json({ shippingCost: shippingCost.toFixed(2) });
});

// App running in port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
