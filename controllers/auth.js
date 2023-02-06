const DB = require("../models");
const User = DB.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecret = process.env.JWT_SECRET || "secret";
const hashRound = process.env.HASH_ROUND || 10;

const signup = async (req, res) => {
  try {
    const data = req.body;
    const rounds = parseInt(hashRound);
    const salt = await bcrypt.genSalt(rounds);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const userDetails = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
    };
    const findUser = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (findUser) {
      res.status(400).json({
        message: "User already exists",
      });
    } else {
      const user = await User.create(userDetails);

      if (!user) {
        res.status(404).json({
          message: "No user found",
        });
      } else {
        res.header("content-type", "application/json");
        res.status(200).json({
          message: "Thank you for registering",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating user",
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(404).json({
        message: "Email or password does not match",
      });
    } else {
      if (bcrypt.compareSync(password, user.password) === false) {
        res.status(404).json({
          message: "Email or password does not match",
        });
      } else {
        const payload = {
          id: user.id,
          email: user.email,
        };
        const token = jwt.sign(payload, jwtSecret);
        res.header("content-type", "application/json");
        res.status(200).json({
          message: "Login successful",
          token: token,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while login user",
    });
  }
};

module.exports = {
  signup,
  login,
};
