const fs = require("fs");
const path = require("path");
const Offer = require("../models/offerModels");
const Metadata = require("../models/metadataModels");
const City = require("../models/cityModel");
const { Media } = require("../models/mediaModels");

const createOffer = async (req, res) => {
  try {
    // Extract user ID from the request
    const userId = req.user.userId;

    // Destructure the necessary fields from the request body
    const {
      active,
      title,
      description,
      media,
      hero,
      category,
      features,
      typeOfHouse,
      propertyType,
      badge,
      currency,
      salePrice,
      pricePm,
      city,
      floorLevel,
      nFloors,
      totalArea,
      lendArea,
      floorArea,
      bedroom,
      bathroom,
      parking,
      furnishing,
    } = req.body;

    // Check if the city already exists in the database
    let cityRecord = await City.findOne({ geonameId: city.geonameId });
    if (!cityRecord) {
      // If the city does not exist, create a new city record
      cityRecord = new City({
        name: city.name,
        countryCode: city.countryCode,
        countryName: city.countryName,
        adminCode1: city.adminCode1,
        adminName1: city.adminName1,
        lat: city.lat,
        lng: city.lng,
        population: city.population,
        geonameId: city.geonameId,
        toponymName: city.toponymName,
        fcl: city.fcl,
        fclName: city.fclName,
        fcode: city.fcode,
        fcodeName: city.fcodeName,
      });
      await cityRecord.save();
    }

    // Create a new offer document
    const newOffer = new Offer({
      active,
      title,
      description,
      media,
      hero,
      category,
      features,
      typeOfHouse,
      status: "pending_approval",
      propertyType,
      badge,
      currency,
      salePrice,
      pricePm,
      city: cityRecord._id, // Reference the city ID
      floorLevel,
      nFloors,
      totalArea,
      lendArea,
      floorArea,
      bedroom,
      bathroom,
      parking,
      furnishing,
      createdBy: userId, // Reference the user ID
    });

    // Save the new offer to the database
    await newOffer.save();

    // Respond with the created offer
    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      data: newOffer,
    });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the offer",
      error: error.message,
    });
  }
};

const getOfferById = async (req, res) => {
  const offerId = req.params.id;
  try {
    const offer = await Offer.findById(offerId)
      .populate("category") // Популируем данные о категории
      .populate({
        path: "metadata.field", // Популируем данные о метаданных
        model: "CategoryField",
      });
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOffer = async (req, res) => {
  const offerId = req.params.id;
  try {
    const offer = await Offer.findById(offerId).populate("media city"); // Популируем данные о категории
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOffer = async (req, res) => {
  try {
    const { userId } = req.user;
    const { offerId } = req.params;
    const updates = req.body;

    const offer = await Offer.findById(offerId).populate("media");
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Проверяем, принадлежит ли оффер пользователю
    if (offer.createdBy.toString() !== userId.toString() && role !== "admin") {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this offer" });
    }

    // Find the offer by ID and update it with the fields provided in the request body
    const updatedOffer = await Offer.findByIdAndUpdate(offerId, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the updates adhere to the schema
    });

    if (!updatedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.status(200).json({
      success: true,
      message: "Offer updated successfully",
      data: updatedOffer,
    });
  } catch (error) {
    console.error("Error updating offer:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the offer",
      error: error.message,
    });
  }
};

const deleteOffer = async (req, res) => {
  const { userId } = req.user;
  const { offerId } = req.params;

  try {
    // Находим оффер
    const offer = await Offer.findById(offerId).populate("media");
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Проверяем, принадлежит ли оффер пользователю
    if (offer.createdBy.toString() !== userId.toString() && role !== "admin") {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this offer" });
    }

    // Удаляем все связанные медиафайлы
    for (let media of offer.media) {
      // Удаляем медиафайл из базы данных
      await Media.findByIdAndDelete(media._id);

      // Удаление оригинального файла
      const originalFilePath = path.join(
        __dirname,
        "../public",
        media.originalPath
      );
      if (fs.existsSync(originalFilePath)) {
        fs.unlinkSync(originalFilePath);
      }

      // Получение имени файла без расширения
      const fileName = path.basename(media.path, path.extname(media.path));

      // Удаление всех файлов с именем ${fileName}.webp в папке /public/resized и её поддиректориях
      const resizedDir = path.resolve(__dirname, "../public/resized");
      deleteFilesRecursively(resizedDir, `${fileName}.webp`);
    }

    // Удаляем оффер из базы данных
    await offer.deleteOne();

    res.json({ message: "Offer and associated media deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Рекурсивная функция для удаления файлов с заданным именем
function deleteFilesRecursively(dir, fileName) {
  if (!fs.existsSync(dir)) return;

  fs.readdirSync(dir).forEach((file) => {
    const currentPath = path.join(dir, file);
    if (fs.lstatSync(currentPath).isDirectory()) {
      // Если это директория, рекурсивно проходим по ней
      deleteFilesRecursively(currentPath, fileName);
    } else if (path.basename(currentPath) === fileName) {
      // Если это файл с нужным именем, удаляем его
      fs.unlinkSync(currentPath);
      console.log(`Удален файл: ${currentPath}`);
    }
  });
}

const getMyOffers = async (req, res) => {
  console.log("test");
  const { userId } = req.user;
  console.log(userId);
  try {
    const offers = await Offer.find({ createdBy: userId }).populate(
      "media city"
    ); // Популируем данные о категории
    if (!offers) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const badges = [
  { slug: "price_negotiable", title: "Price Negotiable" },
  { slug: "urgent_sale", title: "Urgent Sale" },
  { slug: "ready_to_move_in", title: "Ready to Move In" },
  { slug: "price_reduced", title: "Price Reduced" },
  { slug: "luxury_property", title: "Luxury Property" },
  { slug: "tenders_open", title: "Tenders Open" },
  { slug: "under_market_value", title: "Under Market Value" },
];

const getBadgeTitle = (slug) => {
  const badge = badges.find((badge) => badge.slug === slug);
  return badge ? badge.title : slug; // Если тайтл не найден, вернуть слаг
};

const getAllOffers = async (req, res) => {
  console.log("test");
  try {
    const {
      page = 1,
      limit = 20,
      category = "",
      propertyType = "",
    } = req.query;

    // Базовый запрос для агрегации: фильтрация по статусу 'live'
    const matchStage = { status: "live" };

    // Добавляем условие для фильтрации по категории, если категория указана
    if (category) {
      matchStage.category = category;
    }
    if (propertyType) {
      matchStage.propertyType = propertyType;
    }

    // Агрегация с случайной выборкой и ограничением количества
    let offers = await Offer.aggregate([
      { $match: matchStage },
      { $sample: { size: parseInt(limit) } }, // Случайная выборка
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
    ]);

    // Популяция данных
    offers = await Offer.populate(offers, { path: "media city" });

    if (!offers || offers.length === 0) {
      return res.status(404).json({ message: "Offers not found" });
    }

    // Преобразование слага в тайтл перед отправкой данных клиенту
    offers = offers.map((offer) => {
      if (offer.badge) {
        offer.badge = getBadgeTitle(offer.badge);
      }
      return offer;
    });

    res.json(offers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const details = [
  {
    title: "Residential",
    slug: "Residential",
    features: [
      { slug: "Concierge", title: "Concierge" },
      { slug: "AirConditioning", title: "Air Conditioning" },
      { slug: "Pool", title: "Pool" },
      { slug: "Laundry", title: "Laundry" },
      { slug: "Barbeque", title: "Barbeque" },
      { slug: "Gym", title: "Gym" },
      { slug: "ServicedProperty", title: "Serviced Property" },
      { slug: "BalconyPatioTerrace", title: "Balcony/Patio/Terrace" },
      { slug: "Dishwasher", title: "Dishwasher" },
      { slug: "Spa", title: "Spa" },
      { slug: "Lift", title: "Lift" },
      { slug: "PayTVEnabled", title: "Pay TV Enabled" },
      { slug: "RumpusRoom", title: "Rumpus Room" },
      { slug: "SecureParking", title: "Secure Parking" },
      { slug: "SecureCarPark", title: "Secure Car Park" },
      { slug: "Balcony", title: "Balcony" },
      { slug: "Courtyard", title: "Courtyard" },
      { slug: "Sauna", title: "Sauna" },
      { slug: "TennisCourt", title: "Tennis Court" },
      { slug: "SeparateDiningRoom", title: "Separate Dining Room" },
      { slug: "Basement", title: "Basement" },
      { slug: "Broadband", title: "Broadband" },
      { slug: "Deck", title: "Deck" },
      { slug: "InternalLaundry", title: "Internal Laundry" },
      { slug: "LivingArea", title: "Living Area" },
      { slug: "RemoteGarage", title: "Remote Garage" },
      { slug: "Renovated", title: "Renovated" },
      { slug: "RenovatedBathroom", title: "Renovated Bathroom" },
      { slug: "RenovatedKitchen", title: "Renovated Kitchen" },
      { slug: "Study", title: "Study" },
    ],
  },
  {
    title: "Property Features",
    slug: "PropertyFeatures",
    features: [
      { slug: "BackupElectricity", title: "Backup Electricity" },
      { slug: "BackupWater", title: "Backup Water" },
      { slug: "FullyFurnished", title: "Fully Furnished" },
      { slug: "NearWaterfront", title: "Near Waterfront" },
      { slug: "HotWaterSystem", title: "Hot Water System" },
      { slug: "GasEnabled", title: "Gas Enabled" },
      { slug: "ModernBathroom", title: "Modern Bathroom" },
      { slug: "ModernKitchen", title: "Modern Kitchen" },
      { slug: "PolishedTimberFloors", title: "Polished Timber Floors" },
      { slug: "Fenced", title: "Fenced" },
      { slug: "CableTV", title: "Cable TV" },
      { slug: "RainwaterTank", title: "Rainwater Tank" },
      { slug: "CloseToHealthCentres", title: "Close to Health Centres" },
      { slug: "CloseToTransport", title: "Close to Transport" },
      { slug: "CloseToParklands", title: "Close to Parklands" },
      { slug: "CloseToSchools", title: "Close to Schools" },
      { slug: "CloseToShops", title: "Close to Shops" },
      { slug: "Floorboards", title: "Floorboards" },
      { slug: "QuietLocation", title: "Quiet Location" },
      { slug: "EntertainmentArea", title: "Entertainment Area" },
      { slug: "Garden", title: "Garden" },
      { slug: "Lawn", title: "Lawn" },
      { slug: "PetFriendly", title: "Pet Friendly" },
      { slug: "RainwaterTank", title: "Rainwater Tank" },
      { slug: "ShowerFacilities", title: "Shower Facilities" },
      { slug: "SolarHotWater", title: "Solar Hot Water" },
      { slug: "StorageArea", title: "Storage Area" },
      { slug: "SwimmingLapPool", title: "Swimming/Lap Pool" },
      { slug: "AbsoluteWaterfront", title: "Absolute Waterfront" },
      { slug: "BeachCoastalProperty", title: "Beach/Coastal Property" },
      { slug: "NatureProperty", title: "Nature Property" },
      { slug: "PrestigeProperty", title: "Prestige Property" },
      { slug: "ResortProperty", title: "Resort Property" },
      { slug: "RetirementProperty", title: "Retirement Property" },
    ],
  },
  {
    title: "Security",
    slug: "Security",
    features: [
      { slug: "24HourSecurity", title: "24 Hour Security" },
      { slug: "FullyFenced", title: "Fully Fenced" },
      { slug: "AlarmSystem", title: "Alarm System" },
      { slug: "VideoSecurity", title: "Video Security" },
      { slug: "Reception247", title: "Reception 24/7" },
      { slug: "FireSprinklerSystem", title: "Fire Sprinkler System" },
      { slug: "FireAlarm", title: "Fire Alarm" },
      { slug: "GatedCommunity", title: "Gated Community" },
      { slug: "ConciergeManager", title: "Concierge/Manager" },
      { slug: "Intercom", title: "Intercom" },
      { slug: "Safe", title: "Safe" },
      { slug: "SecurityLights", title: "Security Lights" },
      { slug: "SecurityWindows", title: "Security Windows" },
      { slug: "SwipeCard", title: "Swipe Card" },
    ],
  },
  {
    title: "Views",
    slug: "Views",
    features: [
      { slug: "Views", title: "Views" },
      { slug: "SeaOceanViews", title: "Sea/Ocean Views" },
      { slug: "CityViews", title: "City Views" },
    ],
  },
];

const getFilters = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category = "",
      location = "",
      propertyType = "",
      minSalePrice,
      maxSalePrice,
      minTotalArea,
      maxTotalArea,
      minLendArea,
      maxLendArea,
      minFloorArea,
      maxFloorArea,
      bedrooms,
      bathrooms,
      parkings,
      furnishings,
      typeOfHouse,
      features,
    } = req.query;

    console.log(req.query);
    // Базовый запрос для агрегации: фильтрация по статусу 'live'
    const matchStage = { status: "live" };

    // Добавляем условия для фильтрации по категориям и типам собственности
    if (category) {
      console.log(category);
      matchStage.category = category;
    }
    if (propertyType) {
      matchStage.propertyType = propertyType;
    }
    if (typeOfHouse) {
      matchStage.typeOfHouse = { $in: typeOfHouse.split(",") };
    }

    // Добавляем условия для фильтрации по ценовому диапазону
    if (minSalePrice) {
      matchStage.salePrice = {
        ...matchStage.salePrice,
        $gte: parseInt(minSalePrice),
      };
    }
    if (maxSalePrice) {
      matchStage.salePrice = {
        ...matchStage.salePrice,
        $lte: parseInt(maxSalePrice),
      };
    }

    // Добавляем условия для фильтрации по площадям
    if (minTotalArea) {
      matchStage.totalArea = {
        ...matchStage.totalArea,
        $gte: parseInt(minTotalArea),
      };
    }
    if (maxTotalArea) {
      matchStage.totalArea = {
        ...matchStage.totalArea,
        $lte: parseInt(maxTotalArea),
      };
    }

    if (minLendArea) {
      matchStage.lendArea = {
        ...matchStage.lendArea,
        $gte: parseInt(minLendArea),
      };
    }
    if (maxLendArea) {
      matchStage.lendArea = {
        ...matchStage.lendArea,
        $lte: parseInt(maxLendArea),
      };
    }

    if (minFloorArea) {
      matchStage.floorArea = {
        ...matchStage.floorArea,
        $gte: parseInt(minFloorArea),
      };
    }
    if (maxFloorArea) {
      matchStage.floorArea = {
        ...matchStage.floorArea,
        $lte: parseInt(maxFloorArea),
      };
    }

    // Добавляем условия для фильтрации по количеству комнат, ванных, парковок
    if (bedrooms) {
      matchStage.bedroom = { $in: bedrooms.split(",").map(Number) };
    }
    if (bathrooms) {
      matchStage.bathroom = { $in: bathrooms.split(",").map(Number) };
    }
    if (parkings) {
      matchStage.parking = { $in: parkings.split(",").map(Number) };
    }

    // Добавляем условия для фильтрации по меблировке
    if (furnishings) {
      matchStage.furnishing = { $in: furnishings.split(",") };
    }

    // Добавляем условия для фильтрации по особенностям
    if (features) {
      const featureList = features.split(",");
      matchStage.features = { $all: featureList };
    }

    console.log("matchStage", matchStage);

    // Агрегация для получения отфильтрованных офферов
    let offers = await Offer.aggregate([
      { $match: matchStage },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: "cities", // Название коллекции, с которой хотите связаться
          localField: "city", // Поле в вашей коллекции `Offer`
          foreignField: "_id", // Поле `_id` в коллекции `cities`
          as: "city", // Название поля, в котором будут храниться данные из `cities`
        },
      },
      { $unwind: "$city" },
      {
        $lookup: {
          from: "media", // Название коллекции `media`
          localField: "media", // Поле `media` в коллекции `Offer`
          foreignField: "_id", // Поле `_id` в коллекции `media`
          as: "media", // Название поля для данных из `media`
        },
      },
    ]);

    // Извлечение фильтров на основе полученного массива офферов
    const categoriesF = [
      ...new Set(offers.map((offer) => offer.category).filter(Boolean)),
    ];
    const typeOfHouseF = [
      ...new Set(offers.map((offer) => offer.typeOfHouse).filter(Boolean)),
    ];
    const propertyTypeF = [
      ...new Set(offers.map((offer) => offer.propertyType).filter(Boolean)),
    ];

    const salePrices = offers
      .map((offer) => offer.salePrice)
      .filter((val) => val != null);
    const salePrice = {
      min: Math.min(...salePrices),
      max: Math.max(...salePrices),
    };

    const floorLevels = [
      ...new Set(
        offers.map((offer) => offer.floorLevel).filter((val) => val != null)
      ),
    ];
    const nFloors = [
      ...new Set(
        offers.map((offer) => offer.nFloors).filter((val) => val != null)
      ),
    ];

    const totalAreas = offers
      .map((offer) => offer.totalArea)
      .filter((val) => val != null);
    const totalArea = {
      min: Math.min(...totalAreas),
      max: Math.max(...totalAreas),
    };

    const lendAreas = offers
      .map((offer) => offer.lendArea)
      .filter((val) => val != null);
    const lendArea = {
      min: Math.min(...lendAreas),
      max: Math.max(...lendAreas),
    };

    const floorAreas = offers
      .map((offer) => offer.floorArea)
      .filter((val) => val != null);
    const floorArea = {
      min: Math.min(...floorAreas),
      max: Math.max(...floorAreas),
    };

    const bedroomsF = [
      ...new Set(
        offers.map((offer) => offer.bedroom).filter((val) => val != null)
      ),
    ];
    const bathroomsF = [
      ...new Set(
        offers.map((offer) => offer.bathroom).filter((val) => val != null)
      ),
    ];
    const parkingsF = [
      ...new Set(
        offers.map((offer) => offer.parking).filter((val) => val != null)
      ),
    ];
    const furnishingsF = [
      ...new Set(offers.map((offer) => offer.furnishing).filter(Boolean)),
    ];

    // Group features according to the provided details array
    const featuresF = {
      Residential: [],
      PropertyFeatures: [],
      Security: [],
      Views: [],
    };

    offers.forEach((offer) => {
      offer.features.forEach((feature) => {
        for (const detail of details) {
          if (detail.features.some((f) => f.slug === feature)) {
            featuresF[detail.slug].push(feature);
          }
        }
      });
    });

    // Filter out duplicate features
    for (const key in features) {
      features[key] = [...new Set(features[key])];
    }

    const filters = {
      categories: categoriesF,
      typeOfHouse: typeOfHouseF,
      propertyType: propertyTypeF,
      salePrice,
      floorLevels,
      nFloors,
      totalArea,
      lendArea,
      floorArea,
      bedrooms: bedroomsF,
      bathrooms: bathroomsF,
      parkings: parkingsF,
      furnishings: furnishingsF,
      features: featuresF,
    };

    const citiesSet = new Set();
    const uniqueCities = [];

    // Собираем уникальные города
    offers.forEach((offer) => {
      const cityName = `${offer.city.name}, ${offer.city.countryName}`;
      if (!citiesSet.has(cityName)) {
        citiesSet.add(cityName);
        uniqueCities.push({
          title: cityName,
          value: offer.city.name,
          slug: offer.city.name.trim().toLowerCase().replace(/\s+/g, "-"),
        });
      }
    });

    res.json({ offers, filters, cities: uniqueCities });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOffer,
  getOfferById,
  updateOffer,
  deleteOffer,
  getAllOffers,
  getMyOffers,
  getMyOffer,
  getFilters,
};
