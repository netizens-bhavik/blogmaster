const express = require("express");
const router = express.Router();

const user = require("../controllers/category.js");

// add new user
router.post("/", user.create);

// view all user
router.get("/", user.findAll);

// view a user
router.get("/:id", user.findOne);

// update user
router.put("/:id", user.update);

// remove a user with id
router.delete("/:id", user.deleteOne);

module.exports = router;
