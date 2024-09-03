let express = require("express");
let app = express();
const PORT = 3000;

let { post } = require("./models/post.model");
let { sequelize } = require("./lib/index");

let postData = [
  {
    name: "Raabta",
    author: "Ram",
    title: "Intro to SQL ORM",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Stefan",
    author: "Kerschbaumer Stefan",
    title: "Prerender routes in Angular 18",
    content:
      "Vestibulum faucibus ipsum et arcu sagittis, non vulputate ante tempor.",
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
