require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || 3000;

const DB = require("./models");
const userRoutes = require("./routes/users.routes");
const postRoutes = require("./routes/posts.routes");
const categoriesRoutes = require("./routes/categories.routes");
const authRoutes = require("./routes/auth.routes");
require("./config/passport");
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoriesRoutes);

DB.sequelize
  .authenticate({
    // force: true,
  })
  .then(() => {
    console.log("Connected to database");
    logger("Connected to database");
    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
      logger(`Server running at http://${HOSTNAME}:${PORT}/`);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to database", err);
    logger("Unable to connect to database", err);
  });
