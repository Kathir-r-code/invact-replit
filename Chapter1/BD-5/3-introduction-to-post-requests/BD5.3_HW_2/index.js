let express = require("express");
let app = express();
const PORT = 3000;

let { employee } = require("./models/employee.model");
let { sequelize } = require("./lib/index");

app.use(express.json());

let employeeData = [
  {
    id: 1,
    name: "John Doe",
    designation: "Manager",
    department: "Sales",
    salary: 90000,
  },
  {
    id: 2,
    name: "Anna Brown",
    designation: "Developer",
    department: "Engineering",
    salary: 80000,
  },
  {
    id: 3,
    name: "James Smith",
    designation: "Designer",
    department: "Marketing",
    salary: 70000,
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "HR Specialist",
    department: "Human Resources",
    salary: 60000,
  },
  {
    id: 5,
    name: "Michael Wilson",
    designation: "Developer",
    department: "Engineering",
    salary: 85000,
  },
  {
    id: 6,
    name: "Sarah Johnson",
    designation: "Data Analyst",
    department: "Data Science",
    salary: 75000,
  },
  {
    id: 7,
    name: "David Lee",
    designation: "QA Engineer",
    department: "Quality Assurance",
    salary: 70000,
  },
  {
    id: 8,
    name: "Linda Martinez",
    designation: "Office Manager",
    department: "Administration",
    salary: 50000,
  },
  {
    id: 9,
    name: "Robert Hernandez",
    designation: "Product Manager",
    department: "Product",
    salary: 95000,
  },
  {
    id: 10,
    name: "Karen Clark",
    designation: "Sales Associate",
    department: "Sales",
    salary: 55000,
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
 * Exercise 2: Add a new employee in the database
 * Create a POST endpoint /employees/new that’ll return the newly inserted employee details.
 * API CALL: http://localhost:3000/employees/new
 */
async function addNewEmployee(newEmployeeData) {
  let response = await employee.create(newEmployeeData);
  return { newEmployee: response };
}

app.post("/employees/new", async (req, res) => {
  try {
    let newEmployee = req.body.newEmployee;
    let response = await addNewEmployee(newEmployee);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Update employee information
 * Create a POST endpoint /employees/update/:id that’ll return the updated employee details.
 * API Call: http://localhost:3000/employees/update/11
 */
async function updatePostById(updatedEmployeeData, id) {
  let employeeDetails = await employee.findOne({ where: { id } });
  if (!employeeDetails) {
    return {};
  }
  employeeDetails.set(updatedEmployeeData);
  let updatedEmployee = await employeeDetails.save();
  return { message: "Employee updated successfully", updatedEmployee };
}
app.post("/employees/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let newEmployeeData = req.body;
    let response = await updatePostById(newEmployeeData, id);
    if (!response.message) {
      return res.status(404).json({ message: "Employee not found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Delete an employee from the database
 * Create a POST endpoint /employees/delete that’ll delete the employee record from the database.
 *
 */
async function deleteEmployeeById(id) {
  let deletedEmployee = await employee.destroy({ where: { id } });
  if (deletedEmployee === 0) {
    return {};
  }
  return { message: "Employee record deleted successfully" };
}
app.post("/employees/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    let response = await deleteEmployeeById(id);
    if (!response.message) {
      return res.status(404).json({ message: "Employee not found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
