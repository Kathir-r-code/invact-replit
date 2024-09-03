let express = require("express");
let app = express();
const PORT = 3000;

let { agent } = require("./models/agent.model");
let { customer } = require("./models/customer.model");
let { ticket } = require("./models/ticket.model");
let { ticketAgent } = require("./models/ticketAgent.model");
let { ticketCustomer } = require("./models/ticketCustomer.model");

let { sequelize } = require("./lib/index");
let { Op } = require("@sequelize/core");
app.use(express.json());

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    let tickets = await ticket.bulkCreate([
      {
        ticketId: 1,
        title: "Login Issue",
        description: "Cannot login to account",
        status: "open",
        priority: 1,
        customerId: 1,
        agentId: 1,
      },
      {
        ticketId: 2,
        title: "Payment Failure",
        description: "Payment not processed",
        status: "closed",
        priority: 2,
        customerId: 2,
        agentId: 2,
      },
      {
        ticketId: 3,
        title: "Bug Report",
        description: "Found a bug in the system",
        status: "open",
        priority: 3,
        customerId: 1,
        agentId: 1,
      },
    ]);

    let customers = await customer.bulkCreate([
      { customerId: 1, name: "Alice", email: "alice@example.com" },
      { customerId: 2, name: "Bob", email: "bob@example.com" },
    ]);

    let agents = await agent.bulkCreate([
      { agentId: 1, name: "Charlie", email: "charlie@example.com" },
      { agentId: 2, name: "Dave", email: "dave@example.com" },
    ]);

    await ticketCustomer.bulkCreate([
      { ticketId: tickets[0].id, customerId: customers[0].id },
      { ticketId: tickets[2].id, customerId: customers[0].id },
      { ticketId: tickets[1].id, customerId: customers[1].id },
    ]);

    await ticketAgent.bulkCreate([
      { ticketId: tickets[0].id, agentId: agents[0].id },
      { ticketId: tickets[2].id, agentId: agents[0].id },
      { ticketId: tickets[1].id, agentId: agents[1].id },
    ]);

    return res.json({ message: "Database seeded successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

// Helper function to get ticket's associated customers
async function getTicketCustomers(ticketId) {
  const ticketCustomers = await ticketCustomer.findAll({
    where: { ticketId },
  });

  let customerData;
  for (let cus of ticketCustomers) {
    customerData = await customer.findOne({
      where: { id: cus.customerId },
    });
  }
  return customerData;
}

// Helper function to get ticket's associated agents
async function getTicketAgents(ticketId) {
  const ticketAgents = await ticketAgent.findAll({
    where: { ticketId },
  });

  let agentData;
  for (let _agent of ticketAgents) {
    agentData = await agent.findOne({ where: { id: _agent.agentId } });
  }

  return agentData;
}

// Helper function to get ticket details with associated customers and agents
async function getTicketDetails(ticketData) {
  const customer = await getTicketCustomers(ticketData.id);
  const agent = await getTicketAgents(ticketData.id);

  return {
    ...ticketData.dataValues,
    customer,
    agent,
  };
}

// Helper function to create associated agents with ticket
async function addTicketAgent(ticketId, agentId) {
  await ticketAgent.create({
    ticketId: ticketId,
    agentId: agentId,
  });
}

// Helper function to create associated customers with ticket
async function addTicketCustomer(ticketId, customerId) {
  await ticketCustomer.create({
    ticketId: ticketId,
    customerId: customerId,
  });
}

// Helper function to delete ticket agent entry by id
async function deleteTicketAgentById(ticketId) {
  await ticketAgent.destroy({ where: { ticketId } });
}

// Helper function to delete ticket customer entry by id
async function deleteTicketCustomerById(ticketId) {
  await ticketCustomer.destroy({ where: { ticketId } });
}

/**
 * Exercise 1: Get All Tickets
 * Create an endpoint /tickets to fetch all tickets from the database.
 * Example Call: http://localhost:3000/tickets
 */
async function getAllTickets() {
  let tickets = await ticket.findAll();
  let ticketData = [];
  for (let ticket of tickets) {
    ticketData.push(await getTicketDetails(ticket));
  }
  return { tickets: ticketData };
}
app.get("/tickets", async (req, res) => {
  try {
    let response = await getAllTickets();
    if (response.tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tickets", error: error.message });
  }
});

/**
 * Exercise 2: Get Ticket by ID
 * Create an endpoint /tickets/details/:id to fetch ticket data from the database.
 * API Call: http://localhost:3000/tickets/details/1
 */
async function getTicketById(ticketId) {
  let _ticket = await ticket.findOne({ where: { id: ticketId } });
  if (!_ticket) {
    return {};
  }
  let ticketData = await getTicketDetails(_ticket);
  if (!ticketData) {
    return {};
  }
  return { ticket: ticketData };
}
app.get("/tickets/details/:id", async (req, res) => {
  try {
    let ticketId = parseInt(req.params.id);
    let response = await getTicketById(ticketId);
    if (!response.ticket) {
      return res
        .status(404)
        .json({ message: `No ticket found with id ${ticketId}` });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tickets", error: error.message });
  }
});

/**
 * Exercise 3: Get Tickets by Status
 * Create an endpoint /tickets/status/:status to fetch tickets data based on their status (e.g., open, closed)
 * API Call: http://localhost:3000/tickets/status/closed
 */
async function getTicketsByStatus(status) {
  let tickets = await ticket.findAll({
    where: {
      status,
    },
  });
  let ticketData = [];
  for (let ticket of tickets) {
    ticketData.push(await getTicketDetails(ticket));
  }
  return { tickets: ticketData };
}
app.get("/tickets/status/:status", async (req, res) => {
  try {
    let status = req.params.status;
    let response = await getTicketsByStatus(status);
    if (response.tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tickets", error: error.message });
  }
});

/**
 * Exercise 4: Get Tickets Sorted by Priority
 * Create an endpoint /tickets/sort-by-priority to fetch tickets sorted by their priority ( in ascending order )
 * API Call: http://localhost:3000/tickets/sort-by-priority
 */
async function getTicketsSortByPriority() {
  let tickets = await ticket.findAll({
    order: [["priority", "ASC"]],
  });
  let ticketData = [];
  for (let ticket of tickets) {
    ticketData.push(await getTicketDetails(ticket));
  }
  return { tickets: ticketData };
}
app.get("/tickets/sort-by-priority", async (req, res) => {
  try {
    let response = await getTicketsSortByPriority();
    if (response.tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tickets", error: error.message });
  }
});

/**
 * Exercise 5: Add a New Ticket
 * Objective: Add a new ticket to the database.
 * API Call: http://localhost:3000/tickets/new
 */
async function addNewTicket(newTicket) {
  let _ticket = await ticket.create(newTicket);
  await addTicketCustomer(_ticket.id, newTicket.customerId);
  await addTicketAgent(_ticket.id, newTicket.agentId);
  let ticketData = await getTicketDetails(_ticket);
  return { ticket: ticketData };
}
app.post("/tickets/new", async (req, res) => {
  try {
    let newTicket = req.body;
    let response = await addNewTicket(newTicket);
    return res.status(201).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while creating ticket", error: error.message });
  }
});

/**
 * Exercise 6: Update Ticket Details
 * Update the details of a specific ticket.
 * API Call: http://localhost:3000/tickets/update/1
 */

async function updateTicketById(ticketId, updatedTicketData) {
  let _ticket = await ticket.findOne({ where: { id: ticketId } });
  const updatedTicket = Object.assign(_ticket, updatedTicketData);
  const valueChanged =
    _ticket.customerId !== updatedTicketData.customerId ||
    _ticket.agentId !== updatedTicketData.agentId;
  if (valueChanged) {
    await deleteTicketAgentById(ticketId);
    await deleteTicketCustomerById(ticketId);
  }
  _ticket.set(updatedTicket);
  await _ticket.save();
  if (valueChanged) {
    await addTicketCustomer(ticketId, updatedTicket.customerId);
    await addTicketAgent(ticketId, updatedTicket.agentId);
  }
  let ticketData = await getTicketDetails(_ticket);
  return { ticket: ticketData };
}

app.post("/tickets/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let updatingData = req.body;
    let response = await updateTicketById(id, updatingData);
    if (!response.ticket) {
      return res
        .status(404)
        .json({ message: `No ticket found with id ${ticketId}` });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating ticket", error: error.message });
  }
});

/**
 * Exercise 7: Delete a Ticket
 * Objective: Delete a specific ticket from the database.
 * API Call: http://localhost:3000/tickets/delete
 */
async function deleteTicketById(ticketId) {
  let destroyedTicket = await ticket.destroy({ where: { id: ticketId } });
  if (destroyedTicket === 0) {
    return {};
  }
  await deleteTicketAgentById(ticketId);
  await deleteTicketCustomerById(ticketId);
  return { message: `Ticket with ID ${ticketId} deleted successfully.` };
}
app.post("/tickets/delete", async (req, res) => {
  try {
    let ticketId = parseInt(req.body.id);
    let response = await deleteTicketById(ticketId);
    if (!response.message) {
      return res
        .status(404)
        .json({ message: `No ticket found with id ${ticketId}` });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting ticket", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
