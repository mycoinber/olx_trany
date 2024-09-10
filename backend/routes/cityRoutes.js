// routes/cityRoutes.js
const express = require("express");
const { searchCity, getCities } = require("../controllers/cityController");

const router = express.Router();

router.get("/search", searchCity);
router.get("/cities", getCities);

module.exports = router;
