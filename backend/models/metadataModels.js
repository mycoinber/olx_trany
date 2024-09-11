const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const metadataSchema = new mongoose.Schema({
  categoryField: { type: mongoose.Schema.Types.ObjectId, ref: "CategoryField" },
  fieldName: { type: String },
  values: [{ type: String }],
});

const Metadata = mongoose.model("Metadata", metadataSchema);

module.exports = Metadata;
