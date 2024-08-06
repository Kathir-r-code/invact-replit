const express = require("express");
const sqllite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename:
      "./Chapter1/BD-4/5-sql-comparison-operators/BD4.5_HW_2/database.sqlite",
    driver: sqllite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.5 HW2 Template" });
});

// For reference

async function getAllEmployees() {
  let query = `SELECT * FROM employees `;
  let response = await db.all(query, []);
  return { employees: response };
}
app.get("/employees", async (req, res) => {
  try {
    const results = await getAllEmployees();
    if (results.employees.length === 0) {
      return res.status(404).json({
        message: `No employees found `,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 1: Fetch Employees by Minimum Salary
 * Create an endpoint /employees/salary to return employees with a salary greater than a specified value.
 * API Call: http://localhost:3000/employees/salary?minSalary=80000
 * note: Create a function filterEmployeesBySalary to fetch the employees from the database greater than equal to the minimum salary.
 */
async function filterEmployeesBySalary(minSalary) {
  let query = `SELECT * FROM employees WHERE salary >= ?`;
  let response = await db.all(query, [minSalary]);
  return { employees: response };
}
app.get("/employees/salary", async (req, res) => {
  let minSalary = req.query.minSalary;
  try {
    const results = await filterEmployeesBySalary(minSalary);
    if (results.employees.length === 0) {
      return res.status(404).json({
        message: `No employees found with minimum salary of ${minSalary}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch Employees by Department and Minimum Experience
 * Create an endpoint /employees/department-experience to return employees by a specific department with years of experience greater than a specified value.
 * API Call: http://localhost:3000/employees/department-experience?department=Engineering&minExperience=5
 */
async function filterEmployeesByDepartmentAndExperience(
  department,
  minExperience,
) {
  let query = `SELECT * FROM employees WHERE department = ? AND years_of_experience >= ?`;
  let response = await db.all(query, [department, minExperience]);
  return { employees: response };
}
app.get("/employees/department-experience", async (req, res) => {
  let department = req.query.department;
  let minExperience = req.query.minExperience;
  try {
    const results = await filterEmployeesByDepartmentAndExperience(
      department,
      minExperience,
    );
    if (results.employees.length === 0) {
      return res.status(404).json({
        message: `No employees found in department - ${department} with minimum experience of ${minExperience}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch Employees Ordered by Salary
 * Create an endpoint /employees/ordered-by-salary to return employees ordered by salary in descending order.
 * API Call: http://localhost:3000/employees/ordered-by-salary
 */
async function fetchEmployeesOrderedBySalary() {
  let query = `SELECT * FROM employees  ORDER BY salary DESC`;
  let response = await db.all(query, []);
  return { employees: response };
}
app.get("/employees/ordered-by-salary", async (req, res) => {
  try {
    const results = await fetchEmployeesOrderedBySalary();
    if (results.employees.length === 0) {
      return res.status(404).json({
        message: `No employees found`,
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
