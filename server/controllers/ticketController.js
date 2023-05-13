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

// @desc get user ticket
// @route GET/api/tickets/:id
// @access private
const getTicket = asyncHandler(async (req, res) => {
  // Get user from token
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not authorized to view this ticket");
  }

  res.status(200).json(ticket);
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

// @desc delete user ticket
// @route DELETE/api/tickets/:id
// @access private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user from token
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not authorized to view this ticket");
  }

  await Ticket.findByIdAndDelete(req.params.id);

  res.status(200).json({ sucess: true });
});

// @desc update user ticket
// @route PUT/api/tickets/:id
// @access private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user from token
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not authorized to view this ticket");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
