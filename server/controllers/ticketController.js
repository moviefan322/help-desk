const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc get user tickets
// @route GET/api/tickets
// @access private
const getTickets = asyncHandler(async (req, res) => {
  // Get user from token
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const tickets = await Ticket.find({ user: req.user._id });
  res.status(200).json(tickets);
});

// @desc create new ticket
// @route POST/api/tickets
// @access private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    user: req.user._id,
    product,
    description,
    status: "new",
  });

  res.status(201).json(ticket);
});

module.exports = { getTickets, createTicket };
