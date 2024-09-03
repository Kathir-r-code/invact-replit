let { DataTypes, sequelize } = require("../lib");
let { customer } = require("./customer.model");
let { ticket } = require("./ticket.model");

let ticketCustomer = sequelize.define("ticketCustomer", {
  customerId: {
    type: DataTypes.INTEGER,
    references: {
      model: customer,
      key: "id",
    },
  },
  ticketId: {
    type: DataTypes.INTEGER,
    references: {
      model: ticket,
      key: "id",
    },
  },
});

customer.belongsToMany(ticket, { through: ticketCustomer });
ticket.belongsToMany(customer, { through: ticketCustomer });

module.exports = {
  ticketCustomer,
};
