let sq = require("sequelize");
let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage:
    "./Chapters/BD-5/BD5.3-introduction-to-post-requests/BD5.3_CW/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
