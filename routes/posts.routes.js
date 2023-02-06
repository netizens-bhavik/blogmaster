const express = require("express");
const router = express.Router();
const passport = require("passport");

const user = require("../controllers/posts.js");

// add new user
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  user.create
);

// view all user
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  user.findAll
);

// view a user
router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  user.findOne
);

// update user
router.put(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  user.update
);

// remove a user with id
router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  user.deleteOne
);

module.exports = router;
