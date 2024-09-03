let express = require("express");
let app = express();
const PORT = 3000;

let { book } = require("./models/book.model");
let { sequelize } = require("./lib/index");

const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
let db;

(async () => {
  db = await open({
    filename: "./Chapters/BD-5/1-setting-up-orm/BD5.1_HW_3/database.sqlite",
    driver: sqlite3.Database,
  });
})();

let bookData = [
  {
    title: "1984",
    author: "George Orwell",
    description: "about 1984",
    genre: "history",
  },
  {
    name: "he Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "Gatsby dummy text",
    genre: "bio",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await book.bulkCreate(bookData);
    res.status(200).json({ message: "DataBase seeding successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

async function fetchAllBooks() {
  let query = "SELECT * FROM books";
  let response = await db.all(query, []);
  return { books: response };
}
app.get("/books", async (req, res) => {
  let result = await fetchAllBooks();
  res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
