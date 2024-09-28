let { DataTypes, sequelize } = require('../lib');
let chef = sequelize.define('chef', {
  name: DataTypes.STRING,
  specialty: DataTypes.STRING,
});

module.exports = {
  chef,
};
