const User = require("../models/user");

const getAllUsers = async (req, res) => {
  const users = await User.find();

  return res.json({
    status: "success",
    users,
  });
};

const getuserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user)
    return res.status(404).json({
      status: "error",
      message: `user with ${id} not found`,
    });
  return res.json({
    status: "success",
    user,
  });
};

const createNewUser = async (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.country ||
    !body.city
  )
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
    });

  const user = await User.create({ ...body });
  return res.status(201).json({
    status: "success",
    id: user._id,
    message: "User created successfully",
  });
};

const updateUserById = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const user = await User.findByIdAndUpdate(id, { ...body }, { new: true });

  if (!user)
    return res
      .status(404)
      .json({ status: "error", message: `user with ${id} not found` });

  return res.status(201).json({
    status: "success",
    message: "user updated successfully",
    user: user,
  });
};

const deleteUserById = async (req, res) => {
  const id = req.params.id;

  const user = await User.findByIdAndDelete(id);

  if (!user)
    return res
      .status(404)
      .json({ status: "error", message: `user with ${id} not found` });

  return res.status(200).json({
    status: "success",
    message: "user deleted successfully",
    user: user,
  });
};

module.exports = {
  getAllUsers,
  getuserById,
  createNewUser,
  updateUserById,
  deleteUserById,
};
