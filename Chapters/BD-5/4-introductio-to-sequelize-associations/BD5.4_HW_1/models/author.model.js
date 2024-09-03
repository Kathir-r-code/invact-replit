let { DataTypes, sequelize } = require("../lib");
let author = sequelize.define("author", {
  name: DataTypes.STRING,
  birthYear: DataTypes.INTEGER,
});

module.exports = {
  author,
};
