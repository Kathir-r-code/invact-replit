const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { resolve } = require('path');
const { open } = require('sqlite');
const app = express();

const PORT = process.env.PORT || 3000;
let db;
app.use(express.json());

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

let { chef } = require('./models/chef.model');
let { dish } = require('./models/dish.model');
let { restaurant } = require('./models/restaurant.model');
let { sequelize } = require('./lib/index');

/**
 *  Exercise 1: Fetch All Chefs
 */
async function fetchAllChefs() {
  let query = 'SELECT * FROM chefs';
  let response = await db.all(query, []);
  return { chefs: response };
}
app.get('/v1/chefs', async (req, res) => {
  let result = await fetchAllChefs();
  res.status(200).json(result);
});

/**
 * Sequelize ORM Exercises
 */
app.get('/v2/seed_db', async (req, res) => {
  try {
    // Clear existing data
    await sequelize.sync({ force: true });

    // Seed Chefs
    await chef.create({ name: 'Vikas Khanna', specialty: 'Indian' });
    await chef.create({ name: 'Sanjeev Kapoor', specialty: 'Indian' });
    await chef.create({
      name: 'Gaggan Anand',
      specialty: 'Progressive Indian',
    });

    // Seed Restaurants
    await restaurant.create({
      name: 'Junoon',
      location: 'New York',
      cuisine: 'Indian',
    });
    await restaurant.create({
      name: 'The Yellow Chilli',
      location: 'Mumbai',
      cuisine: 'Indian',
    });
    await restaurant.create({
      name: 'Gaggan',
      location: 'Bangkok',
      cuisine: 'Progressive Indian',
    });

    // Seed Dishes
    await dish.create({ name: 'Dal Makhani', price: 20.0 });
    await dish.create({ name: 'Paneer Butter Masala', price: 25.0 });
    await dish.create({ name: 'Molecular Chaat', price: 40.0 });

    res.status(200).json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ message: 'Error seeding database' });
  }
});

/**
 * Exercise 6: Fetch All Restaurants (Sequelize)
 */
async function fetchAllRestaurants() {
  let restaurants = await restaurant.findAll();
  return { restaurants: restaurants };
}
app.get('/v2/restaurants', async (req, res) => {
  try {
    let response = await fetchAllRestaurants();
    if (response.restaurants.length === 0) {
      res.status(404).json({ message: 'No restaurants found!' });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 7: Fetch Chef Details by ID (Sequelize)
 */
async function fetchChefById(id) {
  let chefData = await chef.findOne({ where: { id } });
  return { chef: chefData };
}
app.get('/v2/chefs/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await fetchChefById(id);
    if (!response.chef) {
      res.status(404).json({ message: `No Chef found with id ${id}!` });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 8: Fetch All Dishes by Name (Sequelize)
 */
async function fetchAllDishByName(name) {
  let dishes = await dish.findAll({
    where: { name },
  });
  return { dishes: dishes };
}
app.get('/v2/dishes/filter', async (req, res) => {
  try {
    let name = req.query.name;
    let response = await fetchAllDishByName(name);
    if (response.dishes.length === 0) {
      res.status(404).json({ message: `No Dishes found!` });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 9: Fetch Restaurants by Location (Sequelize)
 */
async function fetchRestaurantsByLocation(location) {
  let restaurants = await restaurant.findAll({ where: { location: location } });
  return { restaurants: restaurants };
}
app.get('/v2/restaurants/location/:location', async (req, res) => {
  try {
    let location = req.params.location;
    let response = await fetchRestaurantsByLocation(location);
    if (response.restaurants.length === 0) {
      res.status(404).json({ message: `No Restaurants found in ${location}!` });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
