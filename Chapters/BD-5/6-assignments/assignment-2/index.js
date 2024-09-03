let express = require("express");
let app = express();
const PORT = 3000;

let { department } = require("./models/department.model");
let { employee } = require("./models/employee.model");
let { role } = require("./models/role.model");
let { employeeRole } = require("./models/employeeRole.model");
let { employeeDepartment } = require("./models/employeeDepartment.model");

let { sequelize } = require("./lib/index");
let { Op } = require("@sequelize/core");
app.use(express.json());

// Endpoint to seed database
app.get("/seed_db", async (req, res) => {
  await sequelize.sync({ force: true });

  const departments = await department.bulkCreate([
    { name: "Engineering" },
    { name: "Marketing" },
  ]);

  const roles = await role.bulkCreate([
    { title: "Software Engineer" },
    { title: "Marketing Specialist" },
    { title: "Product Manager" },
  ]);

  const employees = await employee.bulkCreate([
    { name: "Rahul Sharma", email: "rahul.sharma@example.com" },
    { name: "Priya Singh", email: "priya.singh@example.com" },
    { name: "Ankit Verma", email: "ankit.verma@example.com" },
  ]);

  // Associate employees with departments and roles using create method on junction models
  await employeeDepartment.create({
    employeeId: employees[0].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[0].id,
    roleId: roles[0].id,
  });

  await employeeDepartment.create({
    employeeId: employees[1].id,
    departmentId: departments[1].id,
  });
  await employeeRole.create({
    employeeId: employees[1].id,
    roleId: roles[1].id,
  });

  await employeeDepartment.create({
    employeeId: employees[2].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[2].id,
    roleId: roles[2].id,
  });

  return res.json({ message: "Database seeded!" });
});

// SPEC Document for Employee Management System Backend

// Helper function to get employee's associated departments
async function getEmployeeDepartments(employeeId) {
  const employeeDepartments = await employeeDepartment.findAll({
    where: { employeeId },
  });

  let departmentData;
  for (let empDep of employeeDepartments) {
    departmentData = await department.findOne({
      where: { id: empDep.departmentId },
    });
  }

  return departmentData;
}

// Helper function to get employee's associated roles
async function getEmployeeRoles(employeeId) {
  const employeeRoles = await employeeRole.findAll({
    where: { employeeId },
  });

  let roleData;
  for (let empRole of employeeRoles) {
    roleData = await role.findOne({
      where: { id: empRole.roleId },
    });
  }

  return roleData;
}

// Helper function to get employee details with associated departments and roles
async function getEmployeeDetails(employeeData) {
  const department = await getEmployeeDepartments(employeeData.id);
  const role = await getEmployeeRoles(employeeData.id);

  return {
    ...employeeData.dataValues,
    department,
    role,
  };
}

// Helper function to create role
async function addEmployeeRole(employeeId, roleId) {
  await employeeRole.create({
    employeeId: employeeId,
    roleId: roleId,
  });
}

// Helper function to create associated customers with ticket
async function addEmployeeDepartment(employeeId, departmentId) {
  await employeeDepartment.create({
    employeeId: employeeId,
    departmentId: departmentId,
  });
}

// Helper function to delete ticket Role entry by id
async function deleteEmployeeRoleById(employeeId) {
  await employeeRole.destroy({ where: { employeeId } });
}

// Helper function to delete ticket Department entry by id
async function deleteEmployeeDepartmentById(employeeId) {
  await employeeDepartment.destroy({ where: { employeeId } });
}

/**
 * Exercise 1: Get All Employees
 * Create an endpoint /employees to fetch all employees from the database.
 * API Call: http://localhost:3000/employees
 */
async function getAllEmployees() {
  let employees = await employee.findAll();
  let employeeData = [];
  for (let _employee of employees) {
    employeeData.push(await getEmployeeDetails(_employee));
  }
  return { employees: employeeData };
}
app.get("/employees", async (req, res) => {
  try {
    let response = await getAllEmployees();
    if (response.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
});

/**
 * Exercise 2: Get Employee by ID
 * Create an endpoint /employees/details/:id to fetch employee data from the database.
 * API Call: http://localhost:3000/employees/details/1
 */
async function getEmployeeById(employeeId) {
  let _employee = await employee.findOne({ where: { id: employeeId } });
  if (!_employee) {
    return {};
  }
  let employeeData = await getEmployeeDetails(_employee);
  if (!employeeData) {
    return {};
  }
  return { employee: employeeData };
}
app.get("/employees/details/:id", async (req, res) => {
  try {
    let employeeId = parseInt(req.params.id);
    let response = await getEmployeeById(employeeId);
    if (!response.employee) {
      return res
        .status(404)
        .json({ message: `No employee found with id ${employeeId}` });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employee", error: error.message });
  }
});

/**
 * Get Employees by Department
 * Create an endpoint /employees/department/:departmentId to fetch employee data based on the department.
 * API Call: http://localhost:3000/employees/department/1
 */
async function getEmployeeByDepartment(departmentId) {
  let employeeDepartments = await employeeDepartment.findAll({
    where: {
      departmentId,
    },
  });
  let employeesData = [];
  for (let empDepartment of employeeDepartments) {
    const employeeData = await employee.findOne({
      where: { id: empDepartment.employeeId },
    });
    employeesData.push(await getEmployeeDetails(employeeData));
  }
  return { employees: employeesData };
}
app.get("/employees/department/:departmentId", async (req, res) => {
  try {
    let departmentId = req.params.departmentId;
    let response = await getEmployeeByDepartment(departmentId);
    if (response.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
});

/**
 * Exercise 4: Get All Employees by Role
 * Create an endpoint /employees/role/:roleId to fetch employee data based on the role.
 * API Call: http://localhost:3000/employees/role/1
 */
async function getEmployeeByRole(roleId) {
  let employeeRoles = await employeeRole.findAll({
    where: {
      roleId,
    },
  });
  let employeesData = [];
  for (let empRole of employeeRoles) {
    const employeeData = await employee.findOne({
      where: { id: empRole.employeeId },
    });
    employeesData.push(await getEmployeeDetails(employeeData));
  }
  return { employees: employeesData };
}

app.get("/employees/role/:roleId", async (req, res) => {
  try {
    let roleId = req.params.roleId;
    let response = await getEmployeeByRole(roleId);
    if (response.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
});

/**
 * Exercise 5: Get Employees Sorted by Name
 * Create an endpoint /employees/sort-by-name to fetch employees sorted by their name.
 * API Call: http://localhost:3000/employees/sort-by-name?order=asc
 */
async function getEmployeeBySortingOrder(order) {
  let employees = await employee.findAll({ order: [["name", order]] });
  let employeesData = [];
  for (let _employee of employees) {
    employeesData.push(await getEmployeeDetails(_employee));
  }
  return { employees: employeesData };
}
app.get("/employees/sort-by-name", async (req, res) => {
  try {
    let order = req.query.order;
    let response = await getEmployeeBySortingOrder(order);
    if (response.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
});

/**
 * Exercise 6: Add a New Employee
 * Objective: Add a new employee to the database.
 * API Call (POST): http://localhost:3000/employees/new
 */
async function addNewEmployee(newEmployeeDetails) {
  let _employee = await employee.create(newEmployeeDetails);
  await addEmployeeDepartment(_employee.id, newEmployeeDetails.departmentId);
  await addEmployeeRole(_employee.id, newEmployeeDetails.roleId);
  let employeeData = await getEmployeeDetails(_employee);
  return employeeData;
}
app.post("/employees/new", async (req, res) => {
  try {
    let newEmployeeDetails = req.body;
    let response = await addNewEmployee(newEmployeeDetails);
    return res.status(201).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while creating employee", error: error.message });
  }
});

/**
 * Exercise 6: Update Employee Details
 * Objective: Update the details of a specific employee.
 * API Call (POST):http://localhost:3000/employees/4
 */
async function updateEmployeeById(employeeId, updatedEmployeeData) {
  let _employee = await employee.findOne({ where: { id: employeeId } });
  const updatedEmployee = Object.assign(_employee, updatedEmployeeData);
  const valueChanged =
    _employee.departmentId !== updatedEmployeeData.departmentId ||
    _employee.roleId !== updatedEmployeeData.roleId;
  if (valueChanged) {
    await deleteEmployeeDepartmentById(employeeId);
    await deleteEmployeeRoleById(employeeId);
  }
  _employee.set(updatedEmployee);
  await _employee.save();
  if (valueChanged) {
    await addEmployeeDepartment(employeeId, updatedEmployee.departmentId);
    await addEmployeeRole(employeeId, updatedEmployee.roleId);
  }
  let employeeData = await getEmployeeDetails(_employee);
  return { employee: employeeData };
}
app.post("/employees/:employeeId", async (req, res) => {
  try {
    let employeeId = parseInt(req.params.employeeId);
    let updatingData = req.body;
    let response = await updateEmployeeById(employeeId, updatingData);
    if (!response.employee) {
      return res
        .status(404)
        .json({ message: `No employee found with id ${employeeId}` });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating employee", error: error.message });
  }
});

/**
 * Exercise 7: Delete an Employee
 * Objective: Delete a specific employee from the database.
 * API Call (POST): http://localhost:3000/employeees/delete
 */
async function deleteEmployeeById(employeeId) {
  let destroyedEmployee = await employee.destroy({ where: { id: employeeId } });
  if (destroyedEmployee === 0) {
    return {};
  }
  await deleteEmployeeDepartmentById(employeeId);
  await deleteEmployeeRoleById(employeeId);
  return { message: `Employee with ID ${employeeId} has been deleted.` };
}
app.post("/employeees/delete", async (req, res) => {
  try {
    let employeeId = parseInt(req.body.id);
    let response = await deleteEmployeeById(employeeId);
    if (!response.message) {
      return res
        .status(404)
        .json({ message: `No employee found with id ${employeeId}` });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error while deleting employee nnn",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
