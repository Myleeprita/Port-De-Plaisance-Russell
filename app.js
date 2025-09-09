const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const userModel = require('./models/userModel');
const session = require('express-session');
const bodyParser = require("body-parser");


const app = express();


// Charge Environnement
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
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Middleware Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erreur serveur' });
});

// Middleware de session
app.use(session({
  secret: "monSuperSecret",
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true })); // pour formulaires HTML
app.use(bodyParser.json()); // pour requêtes JSON (Postman)

// Routes
const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const pageRoutes = require('./routes/pageRoutes');

app.use("/", userRoutes);
app.use("/catway", catwayRoutes);
app.use("/api", reservationRoutes);
app.use("/", pageRoutes);

// Exploitation du dossier public pour les fichiers statiques ( css, img, etc )
app.use(express.static('public'));

// Accueil EJS
app.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.render('index', { users });
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});


// Lancer Serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Le serveur ce lance sur le port ${PORT}`));