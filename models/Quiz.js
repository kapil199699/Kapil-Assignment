const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quizsSchema = new Schema({
  image: { type: String },
  title: { type: String },
  description: { type: String },
});

const quizsModule = model("Quizs", quizsSchema);

module.exports = quizsModule;
