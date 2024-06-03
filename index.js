const express = require("express");
const { connect } = require("mongoose");
const { config } = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./src/Routes/auth");
const watchListRouter = require("./src/Routes/watchList");
const verifyToken = require("./src/Middleware/auth");

config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", authRoutes)
app.use("/api/v1/watchlist",verifyToken, watchListRouter )
app.use("/", (req, res) => {
  res.send("<h1> Server is running on 3001 </h1>");
});

app.listen(3001, async () => {
  await connect(process.env.MONGO_URL);
  console.log("listning of 3001");
});
