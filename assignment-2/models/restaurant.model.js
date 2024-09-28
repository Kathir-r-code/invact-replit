let { DataTypes, sequelize } = require('../lib');
let restaurant = sequelize.define('restaurant', {
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  cuisine: DataTypes.STRING,
});

module.exports = {
  restaurant,
};
