const fs = require("fs");
const path = require("path");
const Offer = require("../models/offerModels");

const createOffer = async (req, res) => {
  const { title, description, slug, createdBy, price, category, metadata } =
    req.body;
  const images = req.files.map((file) => file.path); // Получаем пути к загруженным изображениям
  try {
    const newOffer = new Offer({
      title,
      description,
      images,
      slug,
      createdBy,
      price,
      category,
      metadata,
    });
    const savedOffer = await newOffer.save();
    res.status(201).json(savedOffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

const updateOffer = async (req, res) => {
  const offerId = req.params.id;
  const updatedFields = req.body;
  if (req.files && req.files.length > 0) {
    updatedFields.images = req.files.map((file) => file.path); // Обновляем пути к изображениям
  }
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(offerId, updatedFields, {
      new: true,
    });
    if (!updatedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.json(updatedOffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOffer = async (req, res) => {
  const offerId = req.params.id;
  try {
    const deletedOffer = await Offer.findByIdAndDelete(offerId);
    if (!deletedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Удаляем изображения, связанные с удаленным оффером
    deletedOffer.images.forEach((imagePath) => {
      fs.unlinkSync(path.join(__dirname, "..", imagePath));
    });

    res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOffer,
  getOfferById,
  updateOffer,
  deleteOffer,
};
