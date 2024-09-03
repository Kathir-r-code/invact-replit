let express = require("express");
let app = express();
const PORT = 3000;

let { employee } = require("./models/employee.model");
let { sequelize } = require("./lib/index");

const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
let db;

(async () => {
  db = await open({
    filename: "./Chapters/BD-5/1-setting-up-orm/BD5.1_HW_2/database.sqlite",
    driver: sqlite3.Database,
  });
})();

let employeeData = [
  {
    name: "Raabta",
    department: "IT",
    salary: 500000,
    designation: "SW1",
  },
  {
    name: "Stefan",
    department: "Testing",
    salary: 600000,
    content: "QA1",
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

async function fetchAllEmployees() {
  let query = "SELECT * FROM employees";
  let response = await db.all(query, []);
  return { employees: response };
}
app.get("/employees", async (req, res) => {
  let result = await fetchAllEmployees();
  res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
