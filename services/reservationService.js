const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/reservations.json');

// Lire le fichier reservations.json
function readData() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Ecrire dans le fichier reservation.json
function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Créer une réservation
exports.createReservation = (catwayNumber, reservation) => {
    const data = readData();
    const newId = data.length > 0 ? Math.max(...data.map(r => r.reservationId)) + 1 : 1;

    const newReservation = {
        reservationId: newId,
        catwayNumber: parseInt(catwayNumber),
        ...reservation
    };

    data.push(newReservation);
    writeData(data);
    return newReservation;
};

// Lister l'ensemble des réservations
exports.getReservationsByCatway = (catwayNumber) => {
    const data = readData();
    return data.filter(r => r.catwayNumber === parseInt(catwayNumber));
};

// Récupérer les détails d'une réservation en particulier
exports.getReservation = (catwayNumber, reservationId) => {
    const data = readData();
    return data.find(r => r.catwayNumber === parseInt(catwayNumber) && r.reservationId === parseInt(reservationId));
};

// Modifier un réservation
exports.updateReservation = (catwayNumber, newData) => {
    const data = readData();

    const index = data.findIndex(r => r.catwayNumber === parseInt(catwayNumber));
    if (index === -1) return null;

    data[index] = { ...data[index], ...newData };
    writeData(data);
    return data[index];
};

// Supprimer une réservation
exports.deleteReservation = (catwayNumber, reservationId) => {
    const data = readData();
    const index = data.findIndex(r => r.catwayNumber === parseInt(catwayNumber)&& r.reservationId === parseInt(reservationId));

    if (index === -1) return null;

    const deleted = data.splice(index, 1);
    writeData(data);
    return deleted[0];
};