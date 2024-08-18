const sq = require("sequelize");
let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage:
    "./Chapter1/BD-5/2-writing-queries-with-orm/BD5.2_HW_1/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
