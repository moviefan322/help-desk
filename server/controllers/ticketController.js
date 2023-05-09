const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc get user tickets
// @route GET/api/tickets
// @access private
const getTickets = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get tickets" });
});

// @desc create new ticket
// @route POST/api/tickets
// @access private
const createTicket = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "create ticket" });
});

module.exports = { getTickets, createTicket };
