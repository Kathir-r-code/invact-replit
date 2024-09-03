let express = require("express");
let app = express();
const PORT = 3000;

let { employee } = require("./models/employee.model");
let { sequelize } = require("./lib/index");

let employeeData = [
  {
    id: 1,
    name: "Alice",
    salary: 60000,
    department: "Engineering",
    designation: "Software Engineer",
  },
  {
    id: 2,
    name: "Bob",
    salary: 70000,
    department: "Marketing",
    designation: "Marketing Manager",
  },
  {
    id: 3,
    name: "Charlie",
    salary: 80000,
    department: "Engineering",
    designation: "Senior Software Engineer",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await employee.bulkCreate(employeeData);
    res.status(200).json({ message: "DataBase seeding successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

/**
 * Exercise 1: Fetch all employees
 * Create an endpoint /employees that’ll return all the employees in the database.
 * API Call: http://localhost:3000/employees
 */
async function fetchAllEmployees() {
  let employees = await employee.findAll();
  return { employees };
}
app.get("/employees", async (req, res) => {
  try {
    let results = await fetchAllEmployees();
    if (results.employees.length === 0) {
      return res.status(404).json({ message: "No employees found!" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch employee details by ID
 * Create an endpoint /employees/details/:id that’ll return employee details based on the ID.
 * API Call: http://localhost:3000/employees/details/2
 */
async function fetchEmployeeById(id) {
  let employeeData = await employee.findOne({ where: { id } });
  return { employee: employeeData };
}
app.get("/employees/details/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await fetchEmployeeById(id);
    if (!result.employee) {
      return res.status(400).json({ message: "Employee not found!" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch all employees by department
 * Create an endpoint /employees/department/:department that’ll return all the employees in a department.
 * API Call: http://localhost:3000/employees/department/Engineering
 */
async function fetchEmployeesByDepartment(department) {
  let employees = await employee.findAll({ where: { department } });
  return { employees };
}
app.get("/employees/department/:department", async (req, res) => {
  try {
    let dept = req.params.department;
    let results = await fetchEmployeesByDepartment(dept);
    if (results.employees.length === 0) {
      return res.status(404).json({ message: "No employees found!" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Sort all the employees by their salary
 * Create an endpoint /employees/sort/salary that’ll return all the employees sorted by their salary.
 * API Call: http://localhost:3000/employees/sort/salary?order=desc
 */
async function sortEmployeesBySalary(order) {
  let employees = await employee.findAll({ order: [["salary", order]] });
  return { employees };
}
app.get("/employees/sort/salary", async (req, res) => {
  try {
    let orderData = req.query.order;
    let results = await sortEmployeesBySalary(orderData);
    if (results.employees.length === 0) {
      return res.status(404).json({ message: "No employees found!" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
