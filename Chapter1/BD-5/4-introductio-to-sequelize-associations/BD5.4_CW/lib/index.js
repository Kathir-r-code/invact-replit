let sq = require("sequelize");
let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage:
    "./Chapter1/BD-5/4-introductio-to-sequelize-associations/BD5.4_CW/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
