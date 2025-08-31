const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");


router.get("/catways/:catwayNumber/reservations", reservationController.getReservationsByCatway);
router.get("/catways/:catwayNumber/reservations/:reservationId", reservationController.getReservationById);
router.post("/catways/:catwayNumber/reservations", reservationController.createReservation);
router.put("/catways/:catwayNumber/reservations", reservationController.updateReservation);
router.delete("/catways/:catwayNumber/reservations/:reservationId", reservationController.deleteReservation);

module.exports = router;