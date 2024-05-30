const express = require("express");
const { connect } = require("mongoose");
const { config } = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./Routes/auth");

config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", authRoutes)

app.use("/", (req, res) => {
  res.send("<h1> Server is running on 3001 </h1>");
});

app.listen(3001, async () => {
  await connect(process.env.MONGO_URL);
  console.log("listning of 3001");
});
