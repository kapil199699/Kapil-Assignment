const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const videosSchema = new Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
  save: { type: String },
});

const videosModule = model("Videos", videosSchema);

module.exports = videosModule;
