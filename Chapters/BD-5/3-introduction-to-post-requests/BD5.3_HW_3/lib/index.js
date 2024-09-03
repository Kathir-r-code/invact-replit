const sq = require("sequelize");
let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage:
    "./Chapters/BD-5/3-introduction-to-post-requests/BD5.3_HW_3/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
