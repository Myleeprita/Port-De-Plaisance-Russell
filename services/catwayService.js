const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/catways.json');

// Lire le fichier catways.json
function readData() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Ecrire dans le fichier catways.json
function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Créer un catway
exports.createCatway = (catway) => {
    const data = readData();
    const exists = data.find(c => c.catwayNumber === catway.catwayNumber);
    if (exists) throw new Error("Un catway avec ce numéro existe déjà");

    data.push(catway);
    writeData(data);
    return catway;
};

// Liste l'ensemble des cateways
exports.getAllCatways = () => {
    return readData();
};

// Récupére les détails d'un catway en particulier
exports.getCatwayByNumber = (number) => {
    const data = readData();
    return data.find(c => c.catwayNumber === parseInt(number));
};

// Modifie la description de l'état d'un catway  ( seulement l'état )
exports.updateCatwayState = (number, newState) => {
    const data = readData();
    const index = data.findIndex(c => c.catwayNumber === parseInt(number));
    if (index === -1) return null;

    data[index].catwayState = newState;
    writeData(data);
    return data[index];
};

// Supprime un catway
exports.deleteCatway = (number) => {
    const data = readData();
    const index = data.findIndex(c => c.catwayNumber === parseInt(number));
    if (index === -1) return null;

    const deleted = data.splice(index,-1);
    writeData(data);
    return deleted[0];
};