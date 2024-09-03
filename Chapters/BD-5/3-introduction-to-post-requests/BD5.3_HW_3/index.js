let express = require("express");
let app = express();
const PORT = 3000;

let { company } = require("./models/company.model");
let { sequelize } = require("./lib/index");
const { addAbortSignal } = require("stream");

app.use(express.json());

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
 * Exercise 2: Add a new company in the database
 * Create a POST endpoint /companies/new that’ll return the newly inserted employee details.
 * API Call: http://localhost:3000/companies/new
 */
async function addNewCompany(newCompanyData) {
  let companyData = await company.create(newCompanyData);
  return { newCompany: companyData };
}
app.post("/companies/new", async (req, res) => {
  try {
    let newCompany = req.body.newCompany;
    let result = await addNewCompany(newCompany);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Update companies information
 * Create a POST endpoint /companies/update/:id that’ll return the updated company details.
 * API Call: http://localhost:3000/companies/update/11
 */
async function updateCompanyById(companyId, newCompanyData) {
  let companyDetails = await company.findOne({ where: { id: companyId } });
  if (!companyDetails) {
    return {};
  }
  companyDetails.set(newCompanyData);
  let updatedCompany = await companyDetails.save();
  return { message: "Company updated successfully", updatedCompany };
}
app.post("/companies/update/:id", async (req, res) => {
  try {
    let newCompanyData = req.body;
    let id = parseInt(req.params.id);
    let result = await updateCompanyById(id, newCompanyData);
    if (!result.message) {
      return res.status(404).json({ message: "Company not found!" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Delete an company from the database
 * Create a POST endpoint /companies/delete that’ll delete the company record from the database.
 * API call: http://localhost:3000/companies/delete
 */
async function deleteCompanyById(id) {
  let deletedCompany = await company.destroy({ where: { id } });
  if (deletedCompany === 0) {
    return {};
  }
  return { message: "Company record deleted successfully" };
}
app.post("/companies/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    let response = await deleteCompanyById(id);
    if (!response.message) {
      return res.status(404).json({ message: "Company not found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
