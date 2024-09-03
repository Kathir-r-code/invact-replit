const express = require("express");
const sqllite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename:
      "./Chapters/BD-4/4-select-specific-columns/BD4.4_HW_1/database.sqlite",
    driver: sqllite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.4 HW1 Template" });
});

/**
 * Exercise 1: Fetch All Courses
 * Create an endpoint /courses to return all the courses.
 * API Call: http://localhost:3000/courses
 */
async function fetchAllCourses() {
  let query = `SELECT id, title, release_year FROM courses`;
  let response = await db.all(query);
  return { courses: response };
}
app.get("/courses", async (req, res) => {
  try {
    const results = await fetchAllCourses();
    if (results.courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch Courses by Instructor
 * Create an endpoint /courses/instructor/:instructor to return courses by the given instructor.
 * API Call: http://localhost:3000/courses/instructor/John%20Doe
 */
async function fetchCoursesByInstructor(instructor) {
  let query = `SELECT id, title, instructor, category FROM courses WHERE instructor = ?`;
  let response = await db.all(query, [instructor]);
  return { courses: response };
}
app.get("/courses/instructor/:instructor", async (req, res) => {
  let instructor = req.params.instructor;
  try {
    const results = await fetchCoursesByInstructor(instructor);
    if (results.courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch Courses by Category
 * Create an endpoint /courses/category/:category to return courses by the given category.
 * API Call: http://localhost:3000/courses/category/Database
 */
async function fetchCoursesByCategory(category) {
  let query = `SELECT id, title, category, release_year FROM courses WHERE category = ?`;
  let response = await db.all(query, [category]);
  return { courses: response };
}
app.get("/courses/category/:category", async (req, res) => {
  let category = req.params.category;
  try {
    const results = await fetchCoursesByCategory(category);
    if (results.courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Fetch Courses by Year
 * Create an endpoint /courses/year/:year to return courses by the given release year.
 * API Call: http://localhost:3000/courses/year/2021
 */
async function fetchCoursesByYear(year) {
  let query = `SELECT id, title, category, release_year FROM courses WHERE release_year = ?`;
  let response = await db.all(query, [year]);
  return { courses: response };
}
app.get("/courses/year/:year", async (req, res) => {
  let year = req.params.year;
  try {
    const results = await fetchCoursesByYear(year);
    if (results.courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
