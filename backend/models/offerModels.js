const mongoose = require("mongoose");
const slugify = require("slugify");
const crypto = require("crypto");

// Define the status enum
const statusEnum = [
  "live",
  "draft",
  "withdrawn",
  "sold",
  "leased",
  "deleted",
  "rejected",
  "pending_approval",
];

// Define the Offer schema
const offerSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: statusEnum,
    required: true,
  },
  active: { type: Boolean, default: false },
  title: { type: String, required: true },
  description: { type: String, required: true },
  media: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],
  slug: { type: String, unique: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hero: { type: Boolean, default: false },
  category: { type: String },
  features: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  typeOfHouse: { type: String, required: true },
  propertyType: { type: String, required: true },
  badge: { type: String },
  currency: { type: String, required: true },
  salePrice: { type: Number },
  pricePm: { type: Number },
  rentPrice: { type: Number },
  rentPm: { type: Number },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  floorLevel: { type: Number },
  nFloors: { type: Number },
  totalArea: { type: Number },
  lendArea: { type: Number },
  floorArea: { type: Number },
  bedroom: { type: Number },
  bathroom: { type: Number },
  parking: { type: Number },
  furnishing: { type: String },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  phoneViews: { type: Number, default: 0 },
  numberId: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
    unique: true,
  },
});

offerSchema.pre("save", async function (next) {
  try {
    // Генерация базового slug из названия
    const baseSlug = slugify(this.title, { lower: true });

    // Функция для генерации случайной строки
    const generateRandomString = (length = 6) => {
      return crypto.randomBytes(length).toString("hex").substring(0, length);
    };

    // Попробуем создать уникальный slug
    let isUnique = false;
    let randomPart;
    let finalSlug;

    while (!isUnique) {
      // Генерация случайной части slug
      randomPart = generateRandomString(6);
      finalSlug = `${baseSlug}-${randomPart}`;

      // Проверка на уникальность в базе данных
      const existingOffer = await Offer.findOne({ slug: finalSlug });

      if (!existingOffer) {
        // Если не найден дубликат, то slug уникален
        isUnique = true;
      }
    }

    // Устанавливаем уникальный slug
    this.slug = finalSlug;

    // Обновляем поле updatedAt
    this.updatedAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

// Define the Offer model
const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
