const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  originalPath: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  alt: {
    type: String,
    required: false,
  },
  hash: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
});

const Media = mongoose.model("Media", mediaSchema);

module.exports = { Media };
