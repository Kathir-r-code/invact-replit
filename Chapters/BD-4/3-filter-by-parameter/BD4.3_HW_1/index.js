const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename:
      "./Chapters/BD-4/3-filter-by-parameter/BD4.3_HW_1/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3 HW1 Template" });
});

/**
 * Exercise 1: Fetch All Employees by Gender
 * Create an endpoint /employees/gender/:gender to return all employees of a specific gender.
 * API Call: <http://localhost:3000/employees/gender/female>
 */
async function filterByGender(gender) {
  const query = `SELECT * FROM employees WHERE gender = ?`;
  const response = await db.all(query, [gender]);
  return { employees: response };
}
app.get("/employees/gender/:gender", async (req, res) => {
  const gender = req.params.gender;
  try {
    const results = await filterByGender(gender);
    if (results.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch All Employees by Department
 * Create an endpoint /employees/department/:department to return all employees of a specific department.
 * API Call: <http://localhost:3000/employees/department/Engineering>
 */
async function filterByDepartment(department) {
  let query = `SELECT * FROM employees WHERE department = ?`;
  let response = await db.all(query, [department]);
  return { employees: response };
}
app.get("/employees/department/:department", async (req, res) => {
  let department = req.params.department;
  try {
    const results = await filterByDepartment(department);
    if (results.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch All Employees by Job Title
 * Create an endpoint /employees/job_title/:job_title to return all employees of a specific job title.
 * API Call: <http://localhost:3000/employees/job_title/Software%20Engineer>
 */
async function filterByJobTitle(jobTitle) {
  let query = `SELECT * FROM employees WHERE job_title = ?`;
  let response = await db.all(query, [jobTitle]);
  return { employees: response };
}
app.get("/employees/job_title/:job_title", async (req, res) => {
  let job_title = req.params.job_title;
  try {
    const results = await filterByJobTitle(job_title);
    if (results.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Fetch All Employees by Location
 * Create an endpoint /employees/location/:location to return all employees of a specific location.
 * API Call: <http://localhost:3000/employees/location/New%20York>
 */
async function filterByLocation(location) {
  let query = `SELECT * FROM employees WHERE location = ?`;
  let response = await db.all(query, [location]);
  return { employees: response };
}
app.get("/employees/location/:location", async (req, res) => {
  let location = req.params.location;
  try {
    const results = await filterByLocation(location);
    if (results.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
