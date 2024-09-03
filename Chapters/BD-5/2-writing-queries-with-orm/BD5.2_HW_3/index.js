let express = require("express");
let app = express();
const PORT = 3000;

let { company } = require("./models/company.model");
let { sequelize } = require("./lib/index");

let companiesData = [
  {
    id: 1,
    name: "Tech Innovators",
    industry: "Technology",
    foundedYear: 2010,
    headquarters: "San Francisco",
    revenue: 75000000,
  },
  {
    id: 2,
    name: "Green Earth",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Portland",
    revenue: 50000000,
  },
  {
    id: 3,
    name: "Innovatech",
    industry: "Technology",
    foundedYear: 2012,
    headquarters: "Los Angeles",
    revenue: 65000000,
  },
  {
    id: 4,
    name: "Solar Solutions",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Austin",
    revenue: 60000000,
  },
  {
    id: 5,
    name: "HealthFirst",
    industry: "Healthcare",
    foundedYear: 2008,
    headquarters: "New York",
    revenue: 80000000,
  },
  {
    id: 6,
    name: "EcoPower",
    industry: "Renewable Energy",
    foundedYear: 2018,
    headquarters: "Seattle",
    revenue: 55000000,
  },
  {
    id: 7,
    name: "MediCare",
    industry: "Healthcare",
    foundedYear: 2012,
    headquarters: "Boston",
    revenue: 70000000,
  },
  {
    id: 8,
    name: "NextGen Tech",
    industry: "Technology",
    foundedYear: 2018,
    headquarters: "Chicago",
    revenue: 72000000,
  },
  {
    id: 9,
    name: "LifeWell",
    industry: "Healthcare",
    foundedYear: 2010,
    headquarters: "Houston",
    revenue: 75000000,
  },
  {
    id: 10,
    name: "CleanTech",
    industry: "Renewable Energy",
    foundedYear: 2008,
    headquarters: "Denver",
    revenue: 62000000,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await company.bulkCreate(companiesData);
    res.status(200).json({ message: "DataBase seeding successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

/**
 * Exercise 1: Fetch all companies
 * Create an endpoint /companies that’ll return all the companies in the database.
 * API Call: http://localhost:3000/companies
 */
async function fetchAllCompanies() {
  let companies = await company.findAll();
  return { companies };
}
app.get("/companies", async (req, res) => {
  try {
    let results = await fetchAllCompanies();
    if (results.companies.length === 0) {
      return res.status(404).json({ message: "No companies found!" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch companies details by ID
 * Create an endpoint /companies/details/:id that’ll return companies details based on the ID.
 * API Call: http://localhost:3000/companies/details/2
 */
async function fetchCompaniesById(id) {
  let companyData = await company.findOne({ where: { id } });
  return { company: companyData };
}
app.get("/companies/details/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await fetchCompaniesById(id);
    if (!result.company) {
      return res.status(400).json({ message: "Company not found!" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch all companies by industry
 * Create an endpoint /companies/industry/:industry that’ll return all the companies in a industry.
 * API Call: http://localhost:3000/companies/industry/Technology
 */
async function fetchEmployeesByIndustry(industry) {
  let companies = await company.findAll({ where: { industry } });
  return { companies };
}
app.get("/companies/industry/:industry", async (req, res) => {
  try {
    let _industry = req.params.industry;
    let results = await fetchEmployeesByIndustry(_industry);
    if (results.companies.length === 0) {
      return res.status(404).json({ message: "No companies found!" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Sort all the companies by their revenue
 * Create an endpoint /companies/revenue that’ll return all the companies sorted by their revenue.
 * API Call: http://localhost:3000/companies/revenue?order=asc
 */
async function sortCompaniesByRevenue(order) {
  let companies = await company.findAll({ order: [["revenue", order]] });
  return { companies };
}
app.get("/companies/revenue", async (req, res) => {
  try {
    let orderData = req.query.order;
    let results = await sortCompaniesByRevenue(orderData);
    if (results.companies.length === 0) {
      return res.status(404).json({ message: "No companies found!" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
