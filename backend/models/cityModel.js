const mongoose = require("mongoose");

// Define the City schema
const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  countryCode: { type: String, required: true },
  countryName: { type: String, required: true },
  adminCode1: { type: String },
  adminName1: { type: String },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  population: { type: Number },
  geonameId: { type: Number, unique: true },
  toponymName: { type: String },
  fcl: { type: String },
  fclName: { type: String },
  fcode: { type: String },
  fcodeName: { type: String },
});

// Define the City model
const City = mongoose.model("City", citySchema);

module.exports = { City };
