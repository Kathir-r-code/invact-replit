let { DataTypes, sequelize } = require("../lib");
let { user } = require("./user.model");
let { recipe } = require("./recipe.model");

let favorite = sequelize.define("favorite", {
  recipeId: {
    type: DataTypes.INTEGER,
    references: {
      model: recipe,
      key: "id",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
  },
});

recipe.belongsToMany(user, { through: favorite });
user.belongsToMany(recipe, { through: favorite });

module.exports = {
  favorite,
};
