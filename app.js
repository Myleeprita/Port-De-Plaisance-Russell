const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

dotenv.config();

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connecté'))
    .catch((err) => console.log('MongoDB Erreur :', err));

// Déclaration de template + dossier views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware JSON
app.use(express.json());  //Lecture du JSON

// Middleware Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erreur serveur' });
});

// Exploitation du dossier public pour les fichiers statiques ( css, img, etc )
app.use(express.static('public'));