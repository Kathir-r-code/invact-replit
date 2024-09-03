const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./Chapters/BD-4/2-error-handling/BD4.2_HW_3/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 HW3 Template" });
});

// YOUR ENDPOINTS GO HERE
/**
 * Exercise 1: Fetch All Companies
 * Create an endpoint /companies to return all the companies.
 * API call : http://localhost:3000/companies
 */
async function fetchAllCompanies() {
  let query = "SELECT * FROM companies";
  let response = await db.all(query, []);
  return { companies: response };
}
app.get("/companies", async (req, res) => {
  try {
    let result = await fetchAllCompanies();
    if (result.companies.length === 0) {
      return res.status(404).json({ message: "No companies found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch Companies by Industry
 * /**companies/industry/:industry**
 * API call : http://localhost:3000/companies/industry/Energy
 */
async function fetchCompaniesByIndustry(industry) {
  let query = `SELECT * FROM companies WHERE industry = ?`;
  let response = await db.all(query, [industry]);
  return { companies: response };
}
app.get("/companies/industry/:industry", async (req, res) => {
  try {
    let industry = req.params.industry;
    let result = await fetchCompaniesByIndustry(industry);
    if (result.companies.length === 0) {
      return res.status(404).json({ message: "No companies found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch Companies by Revenue Range
 * Create an endpoint /**companies/revenue** to return all the companies.
 * API call: http://localhost:3000/companies/revenue?minRevenue=1000&maxRevenue=3000
 */
async function fetchCompaniesByRevenue(minRevenue, maxRevenue) {
  let query = `SELECT * FROM companies WHERE revenue BETWEEN ? AND ? `;
  let response = await db.all(query, [minRevenue, maxRevenue]);
  return { companies: response };
}
app.get("/companies/revenue", async (req, res) => {
  try {
    let minRevenue = req.query.minRevenue;
    let maxRevenue = req.query.maxRevenue;
    let result = await fetchCompaniesByRevenue(minRevenue, maxRevenue);
    if (result.companies.length === 0) {
      return res.status(404).json({ message: "No companies found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Fetch Companies by Employee Count
 * Create an endpoint /**companies/employees/:employeesCount** to return all the companies.
 * API call: http://localhost:3000/companies/employees/1000
 */
async function fetchCompaniesByEmployeesCount(employeescount) {
  let query = `SELECT * FROM companies WHERE employee_count < ?`;
  let response = await db.all(query, [employeescount]);
  return { companies: response };
}
app.get("/companies/employees/:employeescount", async (req, res) => {
  try {
    let employeescount = req.params.employeescount;
    let result = await fetchCompaniesByEmployeesCount(employeescount);
    if (result.companies.length === 0) {
      return res.status(404).json({ message: "No companies found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 5: Fetch Companies by founded_year
 * Create an endpoint /**companies/founded_year/:founded_year**to return all the companies.
 * API call: http://localhost:3000/companies/founded_year/2005
 */
async function fetchCompaniesByfoundedYear(year) {
  let query = `SELECT * FROM companies WHERE founded_year = ?`;
  let response = await db.all(query, [year]);
  return { companies: response };
}
app.get("/companies/founded_year/:year", async (req, res) => {
  try {
    let year = req.params.year;
    let result = await fetchCompaniesByfoundedYear(year);
    if (result.companies.length === 0) {
      return res.status(404).json({ message: "No companies found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
