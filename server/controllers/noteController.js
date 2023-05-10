const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");

// @desc get notes for a ticket
// @route GET/api/tickets/:ticketId/notes
// @access private
const getNotes = asyncHandler(async (req, res) => {
  // Get user from token
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not authorized to view this ticket");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @desc create note for a ticket
// @route POST/api/tickets/:ticketId/notes
// @access private
const addNote = asyncHandler(async (req, res) => {
  // Get user from token
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not authorized to view this ticket");
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });

  res.status(200).json(note);
});

module.exports = { getNotes, addNote };
