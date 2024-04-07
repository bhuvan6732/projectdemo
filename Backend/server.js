const express = require("express");
const cors = require("cors");
const app = express();
const { getUser, updateuser } = require("./controller/loginController");
const router = require("./router/Router");
const loginRouter = require("./router/loginRoutine");
const { verifyToken } = require("./Middleware/Token");
const helpRouter = require("./router/helpRouter");

const morgan = require("morgan");
const { Model } = require("sequelize");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/", router);
app.use("/api/", loginRouter);
app.use("/api/help", helpRouter);

app.get("/", (req, res) => {
  res.send("home");
});

app.post("/getstatus", verifyToken, (req, res) => {
  console.log("GET STATUS " + req.userid);
  // console.log(req.body);
  const getUsered = getUser(req.userid);
  console.log(getUsered);
  res.json({ user: getUsered });
});

app.post("/update", (req, res) => {
  console.log("UPDATE ENDPOINT");
  updateuser(req.body.Email, req.body.status);
  res.json({ status: "true" });
});

app.use("*", (req, res) => {
  res.send("invalid endpoint");
});

module.exports = app;
