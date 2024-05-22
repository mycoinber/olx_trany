const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  title: {
    type: String,
    required: function () {
      return this.parent().type !== "text";
    },
  },
  value: {
    type: String,
    required: function () {
      return this.parent().type !== "text";
    },
  },
});

const categoryFieldSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  name: { type: String, required: true },
  overview: { type: Boolean, default: false },
  type: {
    type: String,
    required: true,
    enum: ["text", "radio", "select", "checkbox"],
  },
  options: [optionSchema],
});

const CategoryField = mongoose.model("CategoryField", categoryFieldSchema);

module.exports = CategoryField;
