const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const storySchema = new Schema({
  title: { type: String },
  description: { type: String },
  time: { type: String },
  image: { type: String },
});

const storyModule = model("Story", storySchema);

module.exports = storyModule;
