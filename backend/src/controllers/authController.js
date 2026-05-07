const bcrypt = require("bcryptjs");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email and password are required");
  }

  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });

  if (existingUser) {
    res.status(400);
    throw new Error("Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
  });

  res.status(201).json({
    message: "Account created successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user._id),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  res.status(200).json({
    message: "Login successful",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      bookmarks: user.bookmarks,
    },
    token: generateToken(user._id),
  });
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};