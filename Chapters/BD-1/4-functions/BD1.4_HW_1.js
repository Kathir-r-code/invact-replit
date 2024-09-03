const express = require("express");
const app = express();
const PORT = 3000;

/**
 * Question 1: Create an endpoint that returns a welcome message to a student who wants to learn functions.
 * API Call: <http://localhost:3000/welcome>
 * Expected Output: We will now learn functions!
 */
function getWelcomeMessage() {
  return "We will now learn functions!";
}
app.get("/welcome", (req, res) => {
  res.send(getWelcomeMessage());
});

/**
 * Question 2: Create an endpoint that takes a username as a query parameter and returns a greeting message.
 * API Call: <http://localhost:3000/greet?username=John>
 * Expected Output: Hey, John! Are you ready to learn functions with us?
 */
function getGreetingMessage(username) {
  return `Hey, ${username}! Are you ready to learn functions with us?`;
}
app.get("/greet", (req, res) => {
  const username = req.query.username;
  res.send(getGreetingMessage(username));
});

/**
 * Question 3: Create an endpoint that takes the number of yearsOfExp in functions as a query parameter and returns a message indicating the person's experience.
 * API Call: <http://localhost:3000/message?yearsOfExp=3>
 * Expected Output: You have some experience with functions. Great!
 */
function checkYearsOfExp(yearsOfExp) {
  if (yearsOfExp > 0) {
    return "You have some experience with functions. Great!";
  } else {
    return "No worries. You will start writing functions in no time!";
  }
}
app.get("/message", (req, res) => {
  const yearsOfExp = parseInt(req.query.yearsOfExp);
  res.send(checkYearsOfExp(yearsOfExp));
});

/**
 * Question 4: Create an endpoint that takes the number of days and hours a student can dedicate to learn functions per week and returns the total hours available per week.
 * API Call: <http://localhost:3000/hours?days=5&hours=2>
 * Expected Output: 10
 */
function getTime(days, hours) {
  return days * hours;
}
app.get("/hours", (req, res) => {
  const days = parseFloat(req.query.days);
  const hours = parseFloat(req.query.hours);
  res.send(`${getTime(days, hours)}`);
});

/**
 * Question 5: Create an endpoint that takes a username and a boolean hasCompleted indicating module completion status, and returns a message indicating if the student has completed the modules or not.
 * API Call: <http://localhost:3000/module-completion-status?username=John&hasCompleted=true>
 * Expected Output: John has completed the modules
 */
function getModuleCompletion(username, hasCompleted) {
  return `${username} has ${hasCompleted === "true" ? "completed" : "not completed"} the modules`;
}
app.get("/module-completion-status", (req, res) => {
  const username = req.query.username;
  const hasCompleted = req.query.hasCompleted;
  res.send(getModuleCompletion(username, hasCompleted));
});

/**
 * Question 6: Create an endpoint that takes a student's city and name, and returns a personalized greeting message.
 * API Call: <http://localhost:3000/personalized-greeting?city=New%20York&name=John>
 * Expected Output: Hey, John! What's famous about New York?
 */
function getPersonalizedGreeting(city, name) {
  return `Hey, ${name}! What's famous about ${city}?`;
}
app.get("/personalized-greeting", (req, res) => {
  const city = req.query.city;
  const name = req.query.name;
  res.send(getPersonalizedGreeting(city, name));
});

/**
 * Question 7: Create an endpoint that takes a student's birthyear and returns the age.
 * API Call: <http://localhost:3000/find-age?birthyear=1990>
 * Expected Output: 34
 */
function findAge(birthyear) {
  const d = new Date();
  const currentYear = d.getFullYear();
  return currentYear - birthyear;
}
app.get("/find-age", (req, res) => {
  const birthyear = parseInt(req.query.birthyear);
  res.send(`${findAge(birthyear)}`);
});

/**
 * Question 8: Create an endpoint that takes the number of days per week and hours per day a student can dedicate to learning functions and returns whether it is sufficient (>= 30 hours per week) or not.
 * Sample API Call: <http://localhost:3000/is-time-sufficient?days=5&hours=6>
 * Expected Output: The time being dedicated is sufficient for learning functions
 */
function findRequiredTime(days, hours) {
  const totalHours = days * hours;
  if (totalHours >= 30) {
    return "The time being dedicated is sufficient for learning functions";
  } else {
    return "The time being dedicated is insufficient for learning functions";
  }
}
app.get("/is-time-sufficient", (req, res) => {
  const days = parseFloat(req.query.days);
  const hours = parseFloat(req.query.hours);
  res.send(findRequiredTime(days, hours));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
