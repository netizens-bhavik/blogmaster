const e = require("cors");
const _ = require("lodash");
const DB = require("../models");
const User = DB.User;
const Post = DB.Post;

const create = async (req, res) => {
  try {
    const data = req.body;
    const userDetails = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    const user = await User.create(userDetails);

    if (!user) {
      res.status(404).json({
        message: "No user found",
      });
    } else {
      res.header("content-type", "application/json");
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating user",
    });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Post,
          as: "posts",
        },
      ],
    });

    if (!users) {
      res.status(404).json({
        message: "No users found",
      });
    } else {
      res.header("content-type", "application/json");
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving users",
    });
  }
};

const findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({
        message: "No user found",
      });
    } else {
      res.header("content-type", "application/json");
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving user",
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const userDetails = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    const user = await User.update(userDetails, {
      where: { id: id },
    });

    if (!user) {
      res.status(404).json({
        message: "No user found",
      });
    } else {
      res.header("content-type", "application/json");
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while updating user",
    });
  }
};

const deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.destroy({ where: { id: id } });
    if (!user) {
      res.status(404).json({
        message: "No user found",
      });
    } else {
      res.header("content-type", "application/json");
      res.status(200).json({
        message: "User deleted successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while deleting user",
    });
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
};
