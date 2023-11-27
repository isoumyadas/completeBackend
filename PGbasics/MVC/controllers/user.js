const User = require("../models/user");

// Get All Users
const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  return res.status(200).json(allUsers);
};

// Getting User By ID
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }
  return res.json(user);
};

// Updating User by ID
const updateUserById = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { last_name: "Das" });
  return res.status(200).json({ msg: "Success" });
};

//Creating User
const createUser = async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const result = await User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    job_title: req.body.job_title,
  });

  console.log(result);

  return res.status(201).json({ msg: "Success" });
};

// Deleting User By ID
const deleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({ status: "Okay Delete" });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
