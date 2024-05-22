const fs = require("fs");
const path = require("path");
const Offer = require("../models/offerModels");
const Metadata = require("../models/metadataModels");

const createOffer = async (req, res) => {
  console.log(req.body);
  const createdBy = req.user.userId;
  const { title, description, slug, price, category, metadata } = req.body;
  const images = req.files.map((file) =>
    file.path.replace("/usr/src/app/public", "")
  ); // Получаем пути к загруженным изображениям

  try {
    // Преобразуем объект metadata в массив
    const metadataArray = Object.values(metadata).map((meta) =>
      JSON.parse(meta)
    );

    // Сохраняем метаданные отдельно
    const metadataIds = await Promise.all(
      metadataArray.map(async (field) => {
        const newMetadata = new Metadata({
          categoryField: field.fieldId, // исправляем название поля
          fieldName: field.name,
          values: field.value,
        });
        const savedMetadata = await newMetadata.save();
        return savedMetadata._id;
      })
    );

    const newOffer = new Offer({
      title,
      description,
      images,
      slug,
      createdBy,
      price,
      category,
      metadata: metadataIds, // Ссылка на сохраненные метаданные
    });

    const savedOffer = await newOffer.save();
    res.status(201).json(savedOffer);
  } catch (error) {
    console.log(error);
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
