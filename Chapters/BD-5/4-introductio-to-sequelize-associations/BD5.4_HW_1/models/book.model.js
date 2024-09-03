let { DataTypes, sequelize } = require("../lib");
let book = sequelize.define("book", {
  title: DataTypes.STRING,
  genre: DataTypes.STRING,
  publicationYear: DataTypes.INTEGER,
});

module.exports = {
  book,
};
