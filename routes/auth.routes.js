const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/auth.js");

// // add new user
router.post("/register", signup);

// // login user
router.post("/login", login);

module.exports = router;
