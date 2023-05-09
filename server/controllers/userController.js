const asyncHandler = require("express-async-handler");

// @desc Register a new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  res.send("Register");
});

// @desc Login a new user
// @route /api/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  res.send("Login");
});

module.exports = {
  registerUser,
  loginUser,
};
