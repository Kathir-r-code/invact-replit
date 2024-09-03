const sq = require("sequelize");
let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./Chapters/BD-6/assignment-1/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
