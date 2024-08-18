let express = require("express");
let app = express();
const PORT = 3000;

let { post } = require("./models/post.model");
let { sequelize } = require("./lib/index");

let postData = [
  {
    id: 1,
    name: "Post1",
    author: "Author1",
    content: "This is the content of post 1",
    title: "Title1",
  },
  {
    id: 2,
    name: "Post2",
    author: "Author2",
    content: "This is the content of post 2",
    title: "Title2",
  },
  {
    id: 3,
    name: "Post3",
    author: "Author1",
    content: "This is the content of post 3",
    title: "Title3",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await post.bulkCreate(postData);
    res.status(200).json({ message: "DataBase seeding successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

/**
 * Exercise 1: Fetch all posts
 * Create an endpoint /posts that’ll return all the posts in the database.
 * API Call: http://localhost:3000/posts
 */
async function fetchAllPosts() {
  let posts = await post.findAll();
  return { posts: posts };
}
app.get("/posts", async (req, res) => {
  try {
    let results = await fetchAllPosts();
    if (results.posts.length === 0) {
      return res.status(404).json({ message: "No posts found!" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Fetch post details by ID
 * Create an endpoint /posts/details/:id that’ll return post details based on the ID.
 * API Call: http://localhost:3000/posts/details/2
 */
async function fetchPostById(id) {
  let postData = await post.findOne({ where: { id } });
  return { post: postData };
}
app.get("/posts/details/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await fetchPostById(id);
    if (!result.post) {
      return res.status(400).json({ message: "Post not found!" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Fetch all posts by an author
 * Create an endpoint /posts/author/:author that’ll return all the posts by an author.
 * API Call: http://localhost:3000/posts/author/Author1
 */
async function fetchPostsByAuthor(author) {
  let posts = await post.findAll({ where: { author } });
  return { posts };
}
app.get("/posts/author/:author", async (req, res) => {
  try {
    let author = req.params.author;
    let results = await fetchPostsByAuthor(author);
    if (results.posts.length === 0) {
      return res.status(404).json({ message: "No posts found!" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Sort all the posts by their name
 * Create an endpoint /posts/sort/name that’ll return all the posts sorted by their name.
 * API Call: http://localhost:3000/posts/sort/name?order=desc
 */
async function sortPostsByName(order) {
  let posts = await post.findAll({ order: [["name", order]] });
  return { posts };
}
app.get("/posts/sort/name", async (req, res) => {
  try {
    let orderData = req.query.order;
    let results = await sortPostsByName(orderData);
    if (results.posts.length === 0) {
      return res.status(404).json({ message: "No posts found!" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
