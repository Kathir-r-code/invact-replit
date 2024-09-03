const express = require("express");
const sqllite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename:
      "./Chapters/BD-4/5-sql-comparison-operators/BD4.5_HW_1/database.sqlite",
    driver: sqllite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.4 HW2 Template" });
});

/**
 * Exercise 1: Fetch Courses by Minimum Rating
 * Create an endpoint /courses/rating to return courses with a rating greater than a specified value.
 * API Call: http://localhost:3000/courses/rating?minRating=4
 */
async function filterCoursesByRating(minRating) {
  let query = `SELECT * FROM courses WHERE rating >= ?`;
  let response = await db.all(query, [minRating]);
  return { courses: response };
}
app.get("/courses/rating", async (req, res) => {
  let minRating = req.query.minRating;
  try {
    const results = await filterCoursesByRating(minRating);
    if (results.courses.length === 0) {
      return res.status(404).json({
        message: `No courses found with minimum rating of ${minRating}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch Courses by Instructor and Minimum Duration
 * Create an endpoint /courses/instructor-duration to return courses by a specific instructor with a duration greater than a specified value.
 * API Call: http://localhost:3000/courses/instructor-duration?instructor=Instructor%20A&minDuration=7
 */
async function filterCoursesByInstructorAndDuration(instructor, minDuration) {
  let query = `SELECT * FROM courses WHERE instructor = ? AND duration > ? `;
  let response = await db.all(query, [instructor, minDuration]);
  return { courses: response };
}
app.get("/courses/instructor-duration", async (req, res) => {
  let instructor = req.query.instructor;
  let minDuration = req.query.minDuration;
  try {
    const results = await filterCoursesByInstructorAndDuration(
      instructor,
      minDuration,
    );
    if (results.courses.length === 0) {
      return res.status(404).json({
        message: `No courses by ${instructor} with minimum duration of ${minDuration}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch Courses Ordered by Price
 * Create an endpoint /courses/ordered-by-price to return courses ordered by price in descending order.
 * API Call: http://localhost:3000/courses/ordered-by-price
 */
async function fetchCoursesOrderedByPrice() {
  let query = `SELECT * FROM courses ORDER BY price DESC`;
  let response = await db.all(query, []);
  return { courses: response };
}
app.get("/courses/ordered-by-price", async (req, res) => {
  try {
    const results = await fetchCoursesOrderedByPrice();
    if (results.courses.length === 0) {
      return res.status(404).json({
        message: `No courses found`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
