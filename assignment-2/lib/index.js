const sq = require('sequelize');
let sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './sequelize_database.sqlite',
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
