const sq = require("sequelize");
let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./Chapters/BD-5/6-assignments/assignment-2/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
