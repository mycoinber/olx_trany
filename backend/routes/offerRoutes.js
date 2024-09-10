const express = require("express");
const router = express.Router();
const OfferController = require("../controllers/OfferController");
const { verifyToken, verifyRole } = require("../middleware/verifyToken");

// Получение всех офферов
router.get("/get-my-offers", verifyToken, OfferController.getMyOffers);
router.get("/get-filters", OfferController.getFilters);
router.get("/get-offer-edit/:id", verifyToken, OfferController.getMyOffer);

router.get("/", OfferController.getAllOffers);

// Получение оффера по ID
router.get("/:offerId", OfferController.getOfferById);

// Создание нового оффера
router.post("/", verifyToken, OfferController.createOffer);

// Обновление информации об оффере по ID
router.patch("/:offerId", verifyToken, OfferController.updateOffer);

// Удаление оффера по ID
router.delete("/:offerId", verifyToken, OfferController.deleteOffer);

module.exports = router;
