const sq = require("sequelize");
let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./Chapters/BD-5/1-setting-up-orm/BD5.1_HW_2/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
