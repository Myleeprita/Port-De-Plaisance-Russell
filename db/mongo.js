const mongoose = require('mongoose');

// Connection A MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connecté");
    } catch (error) {
        console.error("Erreur de connexion MongoDB :", error.message);
        process.exit(1); //Stop le serveur si erreur!
    }
};

module.exports = connectDB;