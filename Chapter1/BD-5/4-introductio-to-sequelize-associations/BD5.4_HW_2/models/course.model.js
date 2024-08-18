let { DataTypes, sequelize } = require("../lib");

let course = sequelize.define("course", {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
});

module.exports = {
  course,
};
