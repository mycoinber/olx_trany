const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const offerSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // Список ссылок на картинки
  slug: { type: String, unique: true }, // Уникальный слаг
  createdBy: { type: Schema.Types.ObjectId, ref: "User" }, // Ссылка на модель пользователя, создавшего оффер
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  metadata: [
    {
      field: { type: Schema.Types.ObjectId, ref: "CategoryField" },
      value: String,
    },
  ],
});

// Преобразование заголовка в слаг перед сохранением
offerSchema.pre("save", function (next) {
  // Генерируем слаг из заголовка и первых 6 символов идентификатора
  const slug =
    slugify(this.title, { lower: true }) +
    "-" +
    this._id.toString().substring(0, 6);
  this.slug = slug;
  next();
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
