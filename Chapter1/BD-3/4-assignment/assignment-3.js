const express = require("express");
let cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());

// Fitness Tracker
// Data Structure
let activities = [
  { activityId: 1, type: "Running", duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: "Swimming", duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: "Cycling", duration: 60, caloriesBurned: 500 },
];

/**
 * Endpoint 1: Add an Activity
 * Objective: Add a new activity to the tracker.
 * API Call: http://localhost:3000/activities/add?activityId=4&type=Walking&duration=20&caloriesBurned=150
 */
function addActivity(activities, activityId, type, duration, caloriesBurned) {
  activities.push({ activityId, type, duration, caloriesBurned });
  return activities;
}
app.get("/activities/add", (req, res) => {
  const activityId = parseInt(req.query.activityId);
  const type = req.query.type;
  const duration = parseInt(req.query.duration);
  const caloriesBurned = parseInt(req.query.caloriesBurned);
  activities = addActivity(
    activities,
    activityId,
    type,
    duration,
    caloriesBurned,
  );
  res.json({ activities });
});

/**
 * Endpoint 2: Sort Activities by Duration
 * Objective: Sort activities by their duration in ascending order.
 * API Call: http://localhost:3000/activities/sort-by-duration
 */
function sortActivitiesByDuration(activities) {
  return activities.sort((a, b) => a.duration - b.duration);
}
app.get("/activities/sort-by-duration", (req, res) => {
  activities = sortActivitiesByDuration(activities);
  res.json({ activities });
});

/**
 * Endpoint 3: Filter Activities by Type
 * Objective: Filter activities by their type.
 * API Call: http://localhost:3000/activities/filter-by-type?type=Running
 */
function filterActivitiesByType(activity, type) {
  return activity.type === type;
}
app.get("/activities/filter-by-type", (req, res) => {
  const type = req.query.type;
  activities = activities.filter((activity) =>
    filterActivitiesByType(activity, type),
  );
  res.json({ activities });
});

/**
 * Endpoint 4: Calculate Total Calories Burned
 * Objective: Calculate the total calories burned for all activities.
 * API Call: http://localhost:3000/activities/total-calories
 * Expected Output: { 'totalCaloriesBurned': 1200 }
 */
function calculateTotalCaloriesBurned(activities) {
  let totalCaloriesBurned = 0;
  for (let i = 0; i < activities.length; i++) {
    totalCaloriesBurned += activities[i].caloriesBurned;
  }
  return totalCaloriesBurned;
}
app.get("/activities/total-calories", (req, res) => {
  const totalCaloriesBurned = calculateTotalCaloriesBurned(activities);
  res.json({ totalCaloriesBurned });
});

/**
 * Endpoint 5: Update Activity Duration by ID
 * Objective: Update the duration of an activity identified by its ID.
 * API Call: http://localhost:3000/activities/update-duration?activityId=1&duration=35
 */
function updateActivityDurationById(activities, activityId, duration) {
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].activityId === activityId) {
      activities[i].duration = duration;
      break;
    }
  }
  return activities;
}
app.get("/activities/update-duration", (req, res) => {
  const activityId = parseInt(req.query.activityId);
  const duration = parseInt(req.query.duration);
  activities = updateActivityDurationById(activities, activityId, duration);
  res.json({ activities });
});

/**
 * Endpoint 6: Delete Activity by ID
 * Objective: Delete an activity from the tracker by its ID.
 * API Call: http://localhost:3000/activities/delete?activityId=2
 */
function deleteActivityById(activity, activityId) {
  return activity.activityId !== activityId;
}
app.get("/activities/delete", (req, res) => {
  const activityId = parseInt(req.query.activityId);
  activities = activities.filter((activity) =>
    deleteActivityById(activity, activityId),
  );
  res.json({ activities });
});

/**
 * Endpoint 7: Delete Activities by Type
 * Objective: Delete all activities of a specific type from the tracker.
 * API Call: http://localhost:3000/activities/delete-by-type?type=Running
 */
function deleteActivitiesByType(activity, type) {
  return activity.type !== type;
}
app.get("/activities/delete-by-type", (req, res) => {
  const type = req.query.type;
  activities = activities.filter((activity) =>
    deleteActivitiesByType(activity, type),
  );
  res.json({ activities });
});

// Server running on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
