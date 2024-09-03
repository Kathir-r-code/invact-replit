let { DataTypes, sequelize } = require("../lib");
let customer = sequelize.define("customer", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = {
  customer,
};
