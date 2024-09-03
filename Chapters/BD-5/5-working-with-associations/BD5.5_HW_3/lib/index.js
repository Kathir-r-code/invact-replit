const sq = require("sequelize");
let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage:
    "./Chapters/BD-5/5-working-with-associations/BD5.5_HW_3/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
