const userSchemaModel = require("../models/userModel.js");

const addUser = async (req, res) => {
  const UserDetail = req.body;
  try {
    const user = await userSchemaModel.create(UserDetail);
    return res.status(201).json({ status: true, user });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

const ViewAllUser = async (req, res) => {
  try {
    const ViewAllUser = await userSchemaModel.find();
    return res.status(200).json({ status: true, users: ViewAllUser });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await userSchemaModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
   const updatedUser = await userSchemaModel.findByIdAndUpdate(id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    return res.status(200).json({ status: true, user: updatedUser });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

module.exports = {
  addUser,
  ViewAllUser,
  deleteUser,
  updateUser,
};
