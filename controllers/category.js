const _ = require("lodash");
const DB = require("../models");
const Category = DB.Category;

const create = async (req, res) => {
  try {
    const data = req.body;
    const categoryDetails = {
      name: data.name,
    };
    const category = await Category.create(categoryDetails);
    if (!category) {
      res.status(404).json({
        message: "No category found",
      });
    } else {
      res.header("content-type", "application/json");
      res.status(200).json(category);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating category",
    });
  }
};

const findAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (!categories) {
      res.status(404).json({
        message: "No categories found",
      });
    } else {
      res.header("content-type", "application/json");
      res.status(200).json(categories);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving category",
    });
  }
};

const findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    if (!category) {
      res.status(404).json({
        message: "No category found",
      });
    } else {
      res.header("content-type", "application/json");
      res.status(200).json(category);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving category",
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const categoryDetails = {
      name: data.name,
    };
    const category = await Category.update(categoryDetails, {
      where: { id: id },
    });
    if (!category) {
      res.status(404).json({
        message: "No category found",
      });
    } else {
      res.header("content-type", "application/json");
      res.status(200).json(category);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while updating category",
    });
  }
};

const deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.destroy({
      where: { id: id },
    });
    if (!category) {
      res.status(404).json({
        message: "No category found",
      });
    } else {
      res.header("content-type", "application/json");
      res.status(200).json({
        message: "Category deleted successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while deleting category",
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
