let { DataTypes, sequelize } = require("../lib");
let post = sequelize.define("post", {
  name: DataTypes.TEXT,
  author: DataTypes.TEXT,
  title: DataTypes.TEXT,
  content: DataTypes.TEXT,
});

module.exports = {
  post,
};
