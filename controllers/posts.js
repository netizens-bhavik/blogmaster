const _ = require("lodash");
const DB = require("../models");
const Post = DB.Post;

const create = async (req, res) => {
  try {
    const data = req.body;
    const postDetails = {
      postTitle: data.postTitle,
      postContent: data.postContent,
      isPublished: data.isPublished,
      categoryId: data.categoryId,
      userId: data.userId,
    };
    const post = await Post.create(postDetails);
    if (!post) {
      res.status(404).json({
        message: "No post found",
      });
    } else {
      res.header("content-type", "application/json");
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating post",
    });
  }
};

const findAll = async (req, res) => {
  try {
    const posts = await Post.findAll();
    if (!posts) {
      res.status(404).json({
        message: "No posts found",
      });
    } else {
      res.header("content-type", "application/json");
      res.status(200).json(posts);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving posts",
    });
  }
};

const findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id);
    if (!post) {
      res.status(404).json({
        message: "No post found",
      });
    } else {
      res.header("content-type", "application/json");
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving post",
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const postDetails = {
      postTitle: data.postTitle,
      postContent: data.postContent,
      isPublished: data.isPublished,
      categoryId: data.categoryId,
      userId: data.userId,
    };
    const post = await Post.update(postDetails, {
      where: { id: id },
    });
    if (!post) {
      res.status(404).json({
        message: "No post found",
      });
    } else {
      res.header("content-type", "application/json");
      res.status(200).json({
        message: "Post updated successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while updating post",
    });
  }
};

const deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.destroy({
      where: { id: id },
    });
    if (!post) {
      res.status(404).json({
        message: "No post found",
      });
    } else {
      res.header("content-type", "application/json");
      res.status(200).json({
        message: "Post deleted successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while deleting post",
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
