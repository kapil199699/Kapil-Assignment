const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Story = require("./models/Story");
const Videos = require("./models/Videos");
const Quizs = require("./models/Quiz");
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "jhsbdjhcbhbhdbchjbc";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());

const mongoURI =
  "mongodb+srv://india-times:JbcH46ZHWnponQMN@cluster0.fhsxzh8.mongodb.net/test";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.post("/register", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const userDoc = await User.create({
      userName,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: "Error retrieving users" });
  }
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const userDoc = await User.findOne({ userName });
  if (userDoc !== null) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({ userName, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json("ok");
      });
      // res.json();
    } else {
      res.status(400).json("wrong password");
    }
  } else {
    res.status(400).json("User Not Found");
  }
});

app.get("/latestStory", async (req, res) => {
  try {
    const story = await Story.find();
    res.json(story);
  } catch (error) {
    res.status(400).json({ error: "No Story" });
  }
});

app.get("/latestVideo", async (req, res) => {
  try {
    const videos = await Videos.find();
    res.json(videos);
  } catch (error) {
    res.status(400).json({ error: "No Videos" });
  }
});

app.get("/latestQuiz", async (req, res) => {
  try {
    const quizs = await Quizs.find();
    res.json(quizs);
  } catch (error) {
    res.status(400).json({ error: "No Quiz" });
  }
});

app.listen(4000);

