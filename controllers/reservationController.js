const fs = require("fs");
const path = require("path");

const reservationService = require("../services/reservationService");

// Lire le fichier reservations.json
function readReservations() {
    return JSON.parse(fs.readFileSync(reservationsFile, "utf-8"));
}

// Ecrire dans le fichier reservations.json
function writeReservations(data) {
    fs.writeFileSync(reservationsFile, JSON.stringify(data, null, 2));
}

// Créer une réservation
exports.createReservation = (req, res) => {
    const catwayNumber = parseInt(req.params.catwayNumber);
    const { clientName, boatName, startDate, endDate } = req.body;

    let reservations = readReservations();

    const newReservation = {
        reservationId: reservations.length > 0 ? reservations[reservations.length - 1].reservationId + 1 : 1,
        catwayNumber,
        clientName,
        boatName,
        startDate,
        endDate
    };

    reservations.push(newReservation);
    writeReservations(reservations);

    res.status(201).json(newReservation);
};

// Lister l'ensemble des réservations
exports.getReservationsByCatway = (req, res) => {
    const catwayNumber = parseInt(req.params.catwayNumber);
    const reservations = readReservations().filter(r => r.catwayNumber === catwayNumber);
    res.json(reservations);
};

// Récupérer les détails d'une réservation en particulier
exports.getReservationById = (req, res) => {
    const catwayNumber = parseInt(req.params.catwayNumber);
    const reservationId = parseInt(req.params.reservationId);

    const reservations = readReservations();
    const reservation = reservations.find(r => r.catwayNumber === catwayNumber && r.reservationId === reservationId);

    if (!reservation) {
        return res.status(404).json({ message: "Réservation introuvable" });
    }

    res.json(reservation);
};

// Modifier une réservation
exports.updateReservationByCatway = (req, res) => {
    const { catwayNumber } = req.params;
    const newData = req.body;

    const updatedReservation = reservationService.updateReservationByCatway(catwayNumber, newData);

    if (!updatedReservation) {
        return res.status(404).json({ message: "Réservation introuvable" });
    }

    res.status(200).json(updatedReservation);
};

// Supprimer une réservation
exports.deleteReservation = (req, res) => {
    const catwayNumber = parseInt(req.params.catwayNumber);
    const reservationId = parseInt(req.params.reservationId);

    let reservations = readReservations();
    const filtered = reservations.filter(r => !(r.catwayNumber === catwayNumber && r.reservationId === reservationId));

    if (filtered.length === reservations.length) {
        return res.status(404).json({ message: "Réservation introuvable" });
    }

    writeReservations(filtered);
    res.json({ message: "Réservation supprimée" });
};