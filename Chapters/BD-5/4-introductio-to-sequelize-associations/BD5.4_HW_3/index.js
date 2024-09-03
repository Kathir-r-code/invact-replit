let express = require("express");
let app = express();
const PORT = 3000;

let { chef } = require("./models/chef.model");
let { dish } = require("./models/dish.model");
let { chefDish } = require("./models/chefDish.model");
let { sequelize } = require("./lib/index");

app.use(express.json());

let dishData = [
  {
    name: "Margherita Pizza",
    cuisine: "Italian",
    preparationTime: 20,
  },
  {
    name: "Sushi",
    cuisine: "Japanese",
    preparationTime: 50,
  },
  {
    name: "Poutine",
    cuisine: "Canadian",
    preparationTime: 30,
  },
];

let chefData = [
  { name: "Gordon Ramsay", birthYear: 1966 },
  { name: "Masaharu Morimoto", birthYear: 1955 },
  { name: "Ricardo Larrivée", birthYear: 1967 },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await chef.bulkCreate(chefData);
    await dish.bulkCreate(dishData);

    res.status(200).json({ message: "DataBase seeding successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

/**
 * Fetch all Dish
 */
async function fetchAllDishes() {
  let dishes = await dish.findAll();
  return { dishes: dishes };
}
app.get("/dishes", async (req, res) => {
  try {
    let response = await fetchAllDishes();
    if (response.dishes.length === 0) {
      return res.status(404).json({ message: "No dishes found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 *  Fetch all chef
 */
async function fetchAllChefs() {
  let chefs = await chef.findAll();
  return { chefs: chefs };
}
app.get("/chefs", async (req, res) => {
  try {
    let response = await fetchAllChefs();
    if (response.chefs.length === 0) {
      return res.status(404).json({ message: "No chefs found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 1: Create New Chef
 * Create a POST endpoint /chefs/new that will create a new author record in the database.
 */
async function addNewChef(newChefData) {
  let newChef = await chef.create(newChefData);
  return { newChef };
}
app.post("/chefs/new", async (req, res) => {
  try {
    let newChef = req.body.newChef;
    let response = await addNewChef(newChef);
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Update Chef by ID
 * Create a POST endpoint /chefs/update/:id that will update a chef record by ID.
 */
async function updateChefById(updatedChefData, id) {
  let chefDetails = await chef.findOne({ where: { id } });
  if (!chefDetails) {
    return {};
  }
  chefDetails.set(updatedChefData);
  let updatedChef = await chefDetails.save();
  return { message: "Chef updated successfully", updatedChef };
}
app.post("/chefs/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let newChefData = req.body;
    let response = await updateChefById(newChefData, id);
    if (!response.message) {
      return res.status(404).json({ message: "Chef not found!" });
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
