const express = require("express");
require("dotenv").config();
var cors = require("cors");

require("./db");
const userRoute = require("./routes/userRoute");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/user", userRoute);

app.all("*", (req, res) => {
  res.status(404).send(`Can't find this route: ${req.originalUrl}`);
});
app.listen("8000", () => {
  console.log("listening on port 8000");
});
