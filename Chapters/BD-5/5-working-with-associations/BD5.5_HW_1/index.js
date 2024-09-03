let express = require("express");
let app = express();
const PORT = 3000;

let { book } = require("./models/book.model");
let { user } = require("./models/user.model");
let { like } = require("./models/like.model");
let { sequelize } = require("./lib/index");
let { Op } = require("@sequelize/core");
app.use(express.json());

let booksData = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: 1960,
    summary: "A novel about the serious issues of rape and racial inequality.",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    year: 1949,
    summary:
      "A novel presenting a dystopian future under a totalitarian regime.",
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    year: 1851,
    summary:
      "The narrative of the sailor Ishmael and the obsessive quest of Ahab.",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    year: 1813,
    summary:
      "A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: 1925,
    summary: "A novel about the American dream and the roaring twenties.",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await user.create({
      username: "booklover",
      email: "booklover@gmail.com",
      password: "password123",
    });
    await book.bulkCreate(booksData);

    res.status(200).json({ message: "DataBase seeding successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

/**
 * Exercise 1: Like a Book
 * Create an endpoint /users/:id/like that will allow a user to like a book.
 * API Call: http://localhost:3000/users/1/like?bookId=2
 */
async function likeBook(data) {
  let newLike = await like.create({
    userId: data.userId,
    bookId: data.bookId,
  });
  return { message: "Book Liked", newLike };
}
app.get("/users/:id/like", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let bookId = parseInt(req.query.bookId);
    let response = await likeBook({ userId, bookId });
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Dislike a Book
 * Create an endpoint /users/:id/dislike that will allow a user to dislike a book.
 * API Call: http://localhost:3000/users/1/dislike?bookId=2
 */
async function dislikeBook(data) {
  let count = await like.destroy({
    where: {
      userId: data.userId,
      bookId: data.bookId,
    },
  });
  if (count === 0) {
    return {};
  }
  return { message: "Book disliked" };
}
app.get("/users/:id/dislike", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let bookId = parseInt(req.query.bookId);
    let response = await dislikeBook({ userId, bookId });
    if (!response.message) {
      return res
        .status(404)
        .json({ message: "This book is not in ur liked list!" });
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Get All Liked Books
 * Create an endpoint /users/:id/liked that will fetch all liked books of a user.
 * API Call: http://localhost:3000/users/1/liked
 */
async function getAllLikedBooks(userId) {
  let booksIds = await like.findAll({
    where: {
      userId,
    },
    attributes: ["bookId"],
  });
  let bookRecords = [];
  for (let i = 0; i < booksIds.length; i++) {
    bookRecords.push(booksIds[i].bookId);
  }

  let likedBooks = await book.findAll({
    where: { id: { [Op.in]: bookRecords } },
  });
  return { likedBooks };
}
app.get("/users/:id/liked", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let response = await getAllLikedBooks(userId);
    if (response.likedBooks.length === 0) {
      return res.status(404).json({ message: "No liked books found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
