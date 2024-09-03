let express = require("express");
let app = express();
const PORT = 3000;

let { book } = require("./models/book.model");
let { author } = require("./models/author.model");
let { bookAuthor } = require("./models/bookAuthor.model");
let { sequelize } = require("./lib/index");

app.use(express.json());

let booksData = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    genre: "Fantasy",
    publicationYear: 1997,
  },
  { title: "A Game of Thrones", genre: "Fantasy", publicationYear: 1996 },
  { title: "The Hobbit", genre: "Fantasy", publicationYear: 1937 },
];

let authorsData = [{ name: "J.K Rowling", birthYear: 1965 }];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await book.bulkCreate(booksData);
    await author.bulkCreate(authorsData);

    res.status(200).json({ message: "DataBase seeding successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

/**
 * Fetch all books
 */
async function fetchAllBooks() {
  let books = await book.findAll();
  return { books: books };
}
app.get("/books", async (req, res) => {
  try {
    let response = await fetchAllBooks();
    if (response.books.length === 0) {
      return res.status(404).json({ message: "No books found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 *  Fetch all authors
 */
async function fetchAllAuthors() {
  let authors = await author.findAll();
  return { authors: authors };
}
app.get("/authors", async (req, res) => {
  try {
    let response = await fetchAllAuthors();
    if (response.authors.length === 0) {
      return res.status(404).json({ message: "No authors found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 1: Create New Author
 * Create an endpoint /authors/new that will create a new author record in the database.
 */
async function addNewAuthor(newAuthorData) {
  let newAuthor = await author.create(newAuthorData);
  return { newAuthor };
}
app.post("/authors/new", async (req, res) => {
  try {
    let newAuthor = req.body.newAuthor;
    let response = await addNewAuthor(newAuthor);
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Update Author by ID
 * Create an endpoint /authors/update/:id that will update an author record by ID.
 */
async function updateAuthorById(updatedAuthorData, id) {
  let authorDetails = await author.findOne({ where: { id } });
  if (!authorDetails) {
    return {};
  }
  authorDetails.set(updatedAuthorData);
  let updatedAuthor = await authorDetails.save();
  return { message: "Author updated successfully", updatedAuthor };
}
app.post("/authors/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let newAuthorData = req.body;
    let response = await updateAuthorById(newAuthorData, id);
    if (!response.message) {
      return res.status(404).json({ message: "Author not found!" });
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
