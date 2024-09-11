// controllers/cityController.js
const Geonames = require("geonames.js");
const { City } = require("../models/cityModel");

const geo = new Geonames({
  username: "berezhnuy", // Замените на ваш Geonames username
  lan: "en",
  encoding: "JSON",
});

const searchCity = async (req, res) => {
  const { query } = req.query;

  console.log(query);

  if (!query || query.length < 3) {
    return res
      .status(400)
      .json({ message: "Query must be at least 3 characters long." });
  }

  try {
    const response = await geo.search({
      q: query,
      maxRows: 5,
      featureClass: "P",
    });
    res.json(response); // Возвращаем весь ответ от Geonames
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Error fetching cities" });
  }
};

const getCities = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = "" } = req.query;

    // Создаем базовый запрос для поиска в CompanyService
    const query = {};

    if (search) {
      // Добавляем поиск по названию услуги
      query.name = { $regex: search, $options: "i" };
    }

    // Получаем услуги компании с пагинацией
    const cities = await City.find(query)
      .select("name countryName")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const result = cities.map((city) => {
      return {
        title: `${city.name}, ${city.countryName}`,
        value: city.name,
      };
    });
    res.json(result); // Возвращаем весь ответ от Geonames
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Error fetching cities" });
  }
};

module.exports = { searchCity, getCities };
