const sq = require("sequelize");
let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage:
    "./Chapters/BD-5/4-introductio-to-sequelize-associations/BD5.4_HW_3/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
