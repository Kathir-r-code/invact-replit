let { DataTypes, sequelize } = require('../lib');
let dish = sequelize.define('dish', {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
});

module.exports = {
  dish,
};
