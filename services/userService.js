const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

// Lecture des données
function readData() {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");
}

// Ecrit des données
function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Créer un utilisateur
exports.createUser = async (user) => {
    const data = readData();

    // Création ID
    const newId = data.length > 0 ? Math.max(...data.map(u => u.id || 0)) + 1 : 1;

    const newUser = {
        id: newId,
        ...user,
    };

    data.push(newUser);
    writeData(data);
    return newUser;
};

// Récupére l'utilisateur par ID
exports.getUserById = async (id) => {
    const data = readData();
    return data.find(u => u.id === parseInt(id));
};

// Récupére la liste de tout les utilisateurs
exports.getAllUsers = async () => {
    return readData();
};

// Mise à jour d'un utilisateur
exports.updateUser = async (id, newData) => {
    const data = readData();
    const index = data.findIndex(u => u.id === parseInt(id));

    if (index === -1) return null;

    data[index] = { ...data[index], ...newData };
    writeData(data);
    return data[index];
};

// Supprime un utilisateur
exports.deleteUser = async (id) => {
    const data = readData();
    const index = data.findIndex(u => u.id === parseInt(id));

    if (index === -1) return null;

    const deleted = data.splice(index, 1);
    writeData(data);
    return deleted[0];
};

// Modification partielle
exports.patchUser = async (id, newData) => {
    const data = readData();
    const index = data.findIndex(u => u.id === parseInt(id));

    if (index === -1) return null;

    data[index] = { ...data[index], ...newData };
    writeData(data);
    return data[index];
};

// Récupére un utilisateur par email
exports.getUserByEmail = async (email) => {
    const data = readData();
    return data.find(u => u.email === email);
};

// Vérification login
exports.login = async (email, password) => {
    const user = await exports.getUserByEmail(email);
    if (!user || user.password !== password) return null;
    return user;
};