const express = require('express');
const app = express();
const PORT = 3000;

app.get('/custom-commit' , (req, res) => {
  const type = req.query.type;
  const message = req.query.message;
  const result = `${type}: ${message}`;
  res.send(result);
})

app.get('/certificate', (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const courseName = req.query.courseName;
  const result = `This certification is awarded to ${firstName} ${lastName} for completing the course ${courseName}`;
  res.send(result);
})

app.get('/autoreply', (req, res) => {
  const startMonth = req.query.startMonth;
  const endMonth = req.query.endMonth;
  const result = `Dear customer, thank you for reaching out to me. Unfortunately, I'm out of office from ${startMonth} till ${endMonth}. Your enquiry will be resolved by another colleague.`;
  res.send(result);
})

app.get('/secureurl', (req, res) => {
  const domain = req.query.domain;
  const result = `https://${domain}`;
  res.send(result);
})

app.get('/sendotp', (req, res) => {
  const otpCode = req.query.otpCode;
  const result = `Your OTP for account verification is ${otpCode}. Do not share this with anyone`;
  res.send(result);
})

app.get('/welcome', (req, res) => {
  const firstName = req.query.firstName;
  const email = req.query.email;
  const result =`Hey ${firstName}. We're excited to have you here, we'll send future notifications to your registered mail (${email})`
  res.send(result);
})

app.get('/github-profile', (req, res) => {
  const userName = req.query.userName;
  const result = `https://github.com/${userName}`;
  res.send(result);
})

app.get('/text-to-csv', (req, res) => {
  const id = req.query.id;;
  const email = req.query.email;
  const rollNumber = req.query.rollNumber;
  const result = `${id}, ${email}, ${rollNumber}`;
  res.send(result);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})