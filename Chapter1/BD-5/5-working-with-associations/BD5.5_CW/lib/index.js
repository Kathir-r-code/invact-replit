let sq = require("sequelize");
let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage:
    "./Chapter1/BD-5/5-working-with-associations/BD5.5_CW/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
