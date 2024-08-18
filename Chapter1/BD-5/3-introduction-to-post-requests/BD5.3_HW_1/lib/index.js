const sq = require("sequelize");
let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage:
    "./Chapter1/BD-5/BD5.3-introduction-to-post-requests/BD5.3_HW_1/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
