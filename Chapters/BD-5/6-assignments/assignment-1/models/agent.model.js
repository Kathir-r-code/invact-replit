let { DataTypes, sequelize } = require("../lib");
let agent = sequelize.define("agent", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = {
  agent,
};