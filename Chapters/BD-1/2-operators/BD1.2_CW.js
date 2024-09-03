const express = require("express");
const app = express();
const PORT = 3000;

app.get("/total-distance", (req, res) => {
  const distance1 = parseFloat(req.query.distance1);
  const distance2 = parseFloat(req.query.distance2);
  const totalDistance = `${distance1 + distance2}`;
  res.send(totalDistance);
});

app.get("/total-time", (req, res) => {
  const time1 = parseFloat(req.query.time1);
  const time2 = parseFloat(req.query.time2);
  const time3 = parseFloat(req.query.time3);
  const totalTime = `${time1 + time2 + time3}`;
  res.send(totalTime);
});

app.get("/average-speed", (req, res) => {
  const totalDistance = parseFloat(req.query.totalDistance);
  const totalTime = parseFloat(req.query.totalTime);
  const avg = `${totalDistance / totalTime}`;
  res.send(avg);
});

app.get("/eta", (req, res) => {
  const distance = parseFloat(req.query.distance);
  const speed = parseFloat(req.query.speed);
  const eta = `${distance / speed}`;
  res.send(eta);
});

app.get("/total-calories", (req, res) => {
  const duration1 = parseFloat(req.query.duration1);
  const duration2 = parseFloat(req.query.duration2);
  const caloriesPerMinute = parseFloat(req.query.caloriesPerMinute);
  const totalCalories = `${(duration1 + duration2) * caloriesPerMinute}`;
  res.send(totalCalories);
});

app.get("/interest-earned", (req, res) => {
  const principal = parseFloat(req.query.principal);
  const rate = parseFloat(req.query.rate);
  const time = parseFloat(req.query.time);
  const interestEarned = `${(principal * rate * time) / 100}`;
  res.send(interestEarned);
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
